import {
  contactPlainText,
  contactSummaryLines,
  hasErrors,
  normalizeContact,
  validateContact,
  type ContactInput,
} from "@/components/contact/validation";
import { site } from "@/lib/site";

/**
 * Demo / iletişim formu: POST /api/contact (JSON).
 *
 * - Sunucu doğrulaması (form ile aynı kurallar), honeypot doluysa sessizce 200.
 * - Bellek içi IP hız sınırı: 10 dakikada 5 istek. Sunucusuz ortamda örnek başına
 *   tutulur; kaba kötüye kullanımı keser, kesin bir kota değildir.
 * - RESEND_API_KEY varsa Resend REST API ile e-posta; yoksa 503 + { fallback: "mailto" }
 *   döner ve form kullanıcıya hazır bir mailto: bağlantısı gösterir.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16 * 1024;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bellek şişmesin: arada bir süresi dolmuş kayıtları temizle
  if (hits.size > 2000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function htmlBody(input: ContactInput) {
  const rows = contactSummaryLines(input)
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="padding:6px 12px 6px 0;color:#5a6480;font-weight:600;white-space:nowrap">${escapeHtml(k)}</th>` +
        `<td style="padding:6px 0;color:#040c26;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    )
    .join("");
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5">` +
    `<p style="margin:0 0 12px">koordine.com.tr üzerinden yeni demo talebi:</p>` +
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin:16px 0 0;color:#7f88a0;font-size:12px">KVKK aydınlatma metni onaylandı.</p>` +
    `</div>`
  );
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return json(
      { error: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin." },
      429,
      { "Retry-After": String(WINDOW_MS / 1000) }
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: "İstek çok büyük." }, 413);

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "İstek JSON biçiminde olmalı." }, 415);
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ error: "İstek çok büyük." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ error: "İstek okunamadı." }, 400);
  }

  const input = normalizeContact(raw);

  // Bot: başarılı gibi davran, hiçbir şey gönderme
  if (input.website) return json({ ok: true });

  const errors = validateContact(input);
  if (hasErrors(errors)) return json({ error: "Formdaki hataları düzeltin.", errors }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "E-posta gönderimi şu an yapılandırılmamış.", fallback: "mailto" }, 503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Koordine <bildirim@koordine.com.tr>",
        to: [process.env.CONTACT_TO || site.email.support],
        reply_to: input.email,
        subject: `Demo talebi: ${input.company} (${input.name})`.replace(/[\r\n]+/g, " ").slice(0, 200),
        text: `koordine.com.tr üzerinden yeni demo talebi:\n\n${contactPlainText(input)}\n\nKVKK aydınlatma metni onaylandı.`,
        html: htmlBody(input),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend yanıtı:", res.status, await res.text().catch(() => ""));
      return json({ error: "Talebiniz şu an iletilemedi.", fallback: "mailto" }, 502);
    }
  } catch (err) {
    console.error("[contact] Resend isteği başarısız:", err);
    return json({ error: "Talebiniz şu an iletilemedi.", fallback: "mailto" }, 502);
  }

  return json({ ok: true });
}
