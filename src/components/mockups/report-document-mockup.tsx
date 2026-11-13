import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";

/**
 * ReportDocumentMockup — A4 oranlı (1:1.414) saha raporu belgesi.
 * Antet (firma, belge adı, tarih, saha, doküman no), bilgi ızgarası (saha, adres, yüklenici,
 * hava durumu, şantiye şefi, hazırlayan), tipe göre gövde, çizgisel fotoğraf yer tutucuları ve imza alanları.
 * Tüm ölçüler kapsayıcı genişliğine (cqw) göre ölçeklenir: belge hangi genişlikte gösterilirse
 * gösterilsin oranları korunur.
 *
 * Proplar:
 * - `type`: "daily" (Günlük Şantiye Raporu, varsayılan) | "hse" (İSG) | "ncr" (Kalite ve Uygunsuzluk) |
 *   "method" (Yapım Yöntemi) | "material" (Malzeme Sunum Formu) | "checklist" (Kontrol Listesi).
 * - `frame`: belgeyi "Raporlar / Önizleme" uygulama penceresi içinde gösterir (varsayılan false).
 * - `label`, `className`.
 */
export type ReportType = "daily" | "hse" | "ncr" | "method" | "material" | "checklist";

export const REPORT_TYPES: { type: ReportType; title: string; short: string; code: string }[] = [
  { type: "daily", title: "Günlük Şantiye Raporu", short: "Günlük saha raporu", code: "GSR" },
  { type: "hse", title: "İSG Raporu", short: "İSG raporu", code: "İSG" },
  { type: "ncr", title: "Kalite ve Uygunsuzluk Raporu (NCR)", short: "NCR", code: "NCR" },
  { type: "method", title: "Yapım Yöntemi", short: "Yapım yöntemi", code: "YY" },
  { type: "material", title: "Malzeme Sunum Formu", short: "Malzeme sunumu", code: "MS" },
  { type: "checklist", title: "Kontrol Listesi", short: "Kontrol listesi", code: "KL" },
];

export function ReportDocumentMockup({
  type = "daily",
  frame = false,
  label,
  className,
}: {
  type?: ReportType;
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const meta = REPORT_TYPES.find((r) => r.type === type)!;
  const aria = label ?? `${meta.title} örneği: A4 belge olarak antet, bilgi alanları, içerik tabloları ve imza alanları.`;
  const sheet = <Sheet type={type} title={meta.title} />;

  if (frame) {
    return (
      <AppFrame label={aria} crumbs={["Raporlar", "Önizleme"]} code="RPR" className={className} bodyClassName="bg-paper-2 p-[4%]">
        {sheet}
      </AppFrame>
    );
  }
  return (
    <div role="img" aria-label={aria} className={className}>
      <div aria-hidden>{sheet}</div>
    </div>
  );
}

/* ---------- Belge ---------- */

const DOC_NO: Record<ReportType, string | null> = {
  daily: null,
  hse: "İSG-2026-014",
  ncr: "NCR-2026-007",
  method: "YY-ARC-003",
  material: "MS-ARC-012",
  checklist: "KL-2026-021",
};

const DATE_LABEL: Record<ReportType, string> = {
  daily: "Tarih",
  hse: "Denetim tarihi",
  ncr: "Tespit tarihi",
  method: "Hazırlanma tarihi",
  material: "Sunum tarihi",
  checklist: "Kontrol tarihi",
};

function Sheet({ type, title }: { type: ReportType; title: string }) {
  const docNo = DOC_NO[type];
  return (
    <div className="@container w-full">
      <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-white px-[6cqw] py-[5.5cqw] text-[1.85cqw] leading-[1.45] text-ink-800 shadow-[0_1px_0_rgba(4,12,38,0.06),0_12px_32px_-14px_rgba(4,12,38,0.35)] ring-1 ring-line">
        {/* Antet */}
        <div className="flex items-end justify-between border-b-[0.35cqw] border-ink-950 pb-[1.8cqw]">
          <div>
            <div className="font-mono text-[1.55cqw] uppercase tracking-[0.14em] text-ink-500">Yalın Yapı İnşaat</div>
            <div className="mt-[0.6cqw] text-[3.5cqw] font-semibold leading-[1.1] tracking-[-0.01em] text-ink-950">{title}</div>
          </div>
          <div className="text-right text-[1.7cqw] text-ink-600">
            <div className="font-semibold text-ink-950">11.11.2026</div>
            <div>Kadıköy Bahariye Mağaza</div>
            {docNo && (
              <div className="font-mono text-[1.5cqw] text-ink-500">
                {docNo} · Rev. 0
              </div>
            )}
          </div>
        </div>

        {/* Bilgi ızgarası */}
        <div className="mt-[2.4cqw] grid grid-cols-4 border-l border-t border-line-strong">
          <Info k="Saha" v="Kadıköy Bahariye Mağaza" />
          <Info k={DATE_LABEL[type]} v="11.11.2026" />
          <Info k="Adres" v="Caferağa Mah. Bahariye Cad. No: 41, Kadıköy, İstanbul" span />
          <Info k="Yüklenici firma" v="Yalın Yapı İnşaat" />
          {type === "daily" ? <Info k="Hava durumu" v="Parçalı bulutlu · 14 °C" /> : <Info k="Revizyon" v="0" />}
          <Info k="Şantiye şefi" v="Emre Aydın" />
          <Info k="Hazırlayan" v={type === "hse" ? "Hakan Şahin" : type === "material" || type === "method" ? "Selin Kara" : "Emre Aydın"} />
        </div>

        <div className="mt-[2.8cqw] space-y-[2.6cqw]">
          {type === "daily" && <DailyBody />}
          {type === "hse" && <HseBody />}
          {type === "ncr" && <NcrBody />}
          {type === "method" && <MethodBody />}
          {type === "material" && <MaterialBody />}
          {type === "checklist" && <ChecklistBody />}
        </div>

        {/* İmzalar + alt bilgi: sayfanın altına sabit */}
        <div className="absolute inset-x-[6cqw] bottom-[4.5cqw]">
          <div className="grid grid-cols-3 gap-[3cqw]">
            {SIGNERS[type].map(([role, name]) => (
              <div key={role}>
                <div className="h-[5cqw] border-b border-ink-300" />
                <div className="mt-[0.8cqw] text-[1.5cqw] uppercase tracking-[0.06em] text-ink-500">{role}</div>
                <div className="text-[1.7cqw] font-medium text-ink-900">{name}</div>
              </div>
            ))}
          </div>
          <div className="mt-[2.4cqw] flex justify-between border-t border-line pt-[1cqw] font-mono text-[1.35cqw] text-ink-400">
            <span>Koordine · {title}</span>
            <span>1 / 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SIGNERS: Record<ReportType, [string, string][]> = {
  daily: [["Hazırlayan", "Emre Aydın"], ["Şantiye şefi", "Emre Aydın"], ["İmza", ""]],
  hse: [["Denetimi yapan", "Hakan Şahin"], ["İş güvenliği uzmanı", "Hakan Şahin"], ["Şantiye şefi", "Emre Aydın"]],
  ncr: [["Tespit eden", "Selin Kara"], ["Sorumlu firma", "Yalın Yapı"], ["Doğrulayan", "Mert Çelik"]],
  method: [["Hazırlayan", "Selin Kara"], ["Kontrol eden", "Mert Çelik"], ["Onaylayan", "Zeynep Öztürk"]],
  material: [["Hazırlayan", "Selin Kara"], ["Kontrol eden", "Mert Çelik"], ["Onaylayan", "Zeynep Öztürk"]],
  checklist: [["Kontrol eden", "Burak Yıldız"], ["Şantiye şefi", "Emre Aydın"], ["Onaylayan", "Deniz Arslan"]],
};

function Info({ k, v, span }: { k: string; v: string; span?: boolean }) {
  return (
    <div className={cn("border-b border-r border-line-strong px-[1.2cqw] py-[0.8cqw]", span && "col-span-2")}>
      <div className="text-[1.35cqw] uppercase tracking-[0.06em] text-ink-500">{k}</div>
      <div className="text-[1.75cqw] font-medium leading-[1.3] text-ink-950">{v}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-[1cqw] border-b border-line pb-[0.5cqw] text-[1.65cqw] font-semibold uppercase tracking-[0.06em] text-ink-950">
        {title}
      </div>
      {children}
    </div>
  );
}

function Table({ head, rows, total, align }: { head: string[]; rows: React.ReactNode[][]; total?: string[]; align?: ("l" | "r" | "c")[] }) {
  const cls = (i: number) => (align?.[i] === "r" ? "text-right tabular-nums" : align?.[i] === "c" ? "text-center" : "text-left");
  return (
    <table className="w-full border-collapse text-[1.6cqw]">
      <thead>
        <tr className="bg-paper-2 text-[1.3cqw] uppercase tracking-[0.05em] text-ink-600">
          {head.map((h, i) => (
            <th key={h} className={cn("border border-line-strong px-[1cqw] py-[0.5cqw] font-semibold", cls(i))}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((c, i) => (
              <td key={i} className={cn("border border-line-strong px-[1cqw] py-[0.45cqw]", cls(i))}>
                {c}
              </td>
            ))}
          </tr>
        ))}
        {total && (
          <tr className="font-semibold text-ink-950">
            {total.map((c, i) => (
              <td key={i} className={cn("border border-line-strong px-[1cqw] py-[0.45cqw]", i === 0 ? "text-right" : cls(i))}>
                {c}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="space-y-[0.3cqw] text-[1.7cqw]">
      {items.map((t) => (
        <li key={t}>• {t}</li>
      ))}
    </ul>
  );
}

/** Çizgisel fotoğraf yer tutucusu (gerçek fotoğraf yok) */
function Photo({ variant, caption }: { variant: 0 | 1 | 2; caption: string }) {
  return (
    <figure>
      <div className="aspect-[4/3] w-full border border-line-strong bg-paper">
        <svg viewBox="0 0 120 90" className="size-full" fill="none" stroke="#a9b0c2" strokeWidth="0.8">
          {variant === 0 && (
            <>
              {/* Asma tavan karkası */}
              <path d="M0 70 L120 70" />
              <path d="M0 22 L120 22" stroke="#7f88a0" />
              {[10, 30, 50, 70, 90, 110].map((x) => (
                <path key={x} d={`M${x} 22 L${x - 6} 70`} />
              ))}
              {[34, 46, 58].map((y) => (
                <path key={y} d={`M0 ${y} L120 ${y}`} strokeDasharray="2 2" />
              ))}
              <rect x="44" y="72" width="18" height="16" />
            </>
          )}
          {variant === 1 && (
            <>
              {/* İskele ve cephe */}
              <rect x="18" y="10" width="64" height="76" />
              {[24, 38, 52, 66].map((y) => (
                <path key={y} d={`M10 ${y} L90 ${y}`} stroke="#7f88a0" />
              ))}
              {[10, 50, 90].map((x) => (
                <path key={x} d={`M${x} 10 L${x} 86`} stroke="#7f88a0" />
              ))}
              <path d="M10 24 L50 38 M50 24 L90 38 M10 52 L50 66 M50 52 L90 66" />
              <path d="M96 86 L96 40 L116 40 L116 86" />
            </>
          )}
          {variant === 2 && (
            <>
              {/* Seramik zemin perspektifi */}
              <path d="M0 40 L120 40" stroke="#7f88a0" />
              {[-60, -30, 0, 30, 60, 90, 120, 150, 180].map((x) => (
                <path key={x} d={`M60 40 L${x} 90`} />
              ))}
              {[46, 54, 65, 80].map((y) => (
                <path key={y} d={`M0 ${y} L120 ${y}`} />
              ))}
              <rect x="70" y="12" width="26" height="28" />
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-[0.5cqw] truncate text-[1.4cqw] text-ink-500">{caption}</figcaption>
    </figure>
  );
}

function Photos({ captions }: { captions: [string, string, string] }) {
  return (
    <div className="grid grid-cols-3 gap-[1.8cqw]">
      <Photo variant={0} caption={captions[0]} />
      <Photo variant={1} caption={captions[1]} />
      <Photo variant={2} caption={captions[2]} />
    </div>
  );
}

function Mark({ v }: { v: "ok" | "nok" | "na" }) {
  return (
    <span className={cn("font-medium", v === "ok" && "text-ok", v === "nok" && "text-risk", v === "na" && "text-ink-400")}>
      {v === "ok" ? "Uygun" : v === "nok" ? "Uygun değil" : "Kapsam dışı"}
    </span>
  );
}

/* ---------- Tipe göre gövdeler ---------- */

function DailyBody() {
  return (
    <>
      <Section title="Sahadaki personel">
        <Table
          head={["Ekip / Meslek", "Kişi"]}
          align={["l", "r"]}
          rows={[
            ["Alçıpan ekibi (taşeron)", "8"],
            ["Elektrik ekibi", "6"],
            ["Mekanik tesisat ekibi", "5"],
            ["Seramik ekibi", "4"],
          ]}
          total={["Toplam", "23"]}
        />
      </Section>
      <Section title="Bugün yapılan işler">
        <Lines
          items={[
            "Satış alanı asma tavan karkası tamamlandı (%80)",
            "Zemin kat seramik döşemesi, B aksı tamamlandı",
            "Klima iç ünite askıları monte edildi",
          ]}
        />
      </Section>
      <Section title="Sorunlar, gecikmeler ve talepler">
        <Lines items={["Aydınlatma armatürlerinin teslimi 13.11.2026'ya kaydı"]} />
      </Section>
      <Section title="İş güvenliği">
        <Lines items={["Kaza / ramak kala yok, KKD kontrolleri yapıldı"]} />
      </Section>
      <Section title="Fotoğraflar (3)">
        <Photos captions={["Asma tavan karkası", "Cephe iskelesi", "Seramik, B aksı"]} />
      </Section>
    </>
  );
}

function HseBody() {
  return (
    <>
      <Section title="Göstergeler">
        <div className="grid grid-cols-5 border-l border-t border-line-strong text-center">
          {[
            ["Çalışan", "23"],
            ["Adam-saat", "1.012"],
            ["İş kazası", "0"],
            ["Ramak kala", "1"],
            ["Kayıp gün", "0"],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-r border-line-strong py-[0.8cqw]">
              <div className="font-mono text-[2.4cqw] font-medium text-ink-950">{v}</div>
              <div className="text-[1.3cqw] uppercase tracking-[0.05em] text-ink-500">{k}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Saha kontrol listesi">
        <Table
          head={["Madde", "Durum"]}
          rows={(
            [
              ["Kişisel koruyucu donanım kullanımı", "ok"],
              ["Yüksekte çalışma: emniyet kemeri, yaşam hattı", "nok"],
              ["İskele kurulumu, etiketleri ve periyodik kontrolü", "ok"],
              ["Geçici elektrik tesisatı ve kaçak akım rölesi", "ok"],
              ["Kazı, şev ve hendek güvenliği", "na"],
            ] as const
          ).map(([a, b]) => [a, <Mark key={a} v={b} />])}
          align={["l", "l"]}
        />
      </Section>
      <Section title="Uygunsuzluklar ve düzeltici faaliyetler">
        <Table
          head={["Tespit", "Risk", "Düzeltici faaliyet", "Termin"]}
          rows={[
            ["Cephe iskelesinde yaşam hattı eksik", "Yüksek", "Yaşam hattı kurulacak", "12.11.2026"],
            ["Pano önünde malzeme istifi", "Orta", "Alan boşaltılacak", "11.11.2026"],
          ]}
        />
      </Section>
    </>
  );
}

function NcrBody() {
  return (
    <>
      <div className="grid grid-cols-4 border-l border-t border-line-strong">
        <Info k="Kategori" v="İşçilik" />
        <Info k="Önem derecesi" v="Majör" />
        <Info k="Durum" v="Doğrulama bekliyor" span />
        <Info k="İlgili proje / şartname" v="Mimari uygulama projesi A-201" span />
        <Info k="Sorumlu firma" v="Yalın Yapı İnşaat" span />
      </div>
      <Section title="Uygunsuzluk">
        <p className="text-[1.7cqw]">
          Satış alanı zemininde, B-C aksları arasında seramik derzlerinde 3 mm&apos;ye varan kot farkı tespit edildi.
        </p>
        <p className="mt-[0.8cqw] text-[1.6cqw] text-ink-600">
          <span className="font-semibold text-ink-800">Gereklilik:</span> Teknik şartname 4.3 — komşu karolar arası kot farkı en fazla 1 mm.
        </p>
      </Section>
      <Section title="Düzeltici ve önleyici faaliyet">
        <Table
          head={["Karar", "Düzeltici faaliyet", "Sorumlu", "Termin"]}
          rows={[["Yeniden yapılacak", "Etkilenen 14 m² söküm ve yeniden döşeme", "Mert Çelik", "15.11.2026"]]}
        />
      </Section>
      <Section title="Fotoğraflar">
        <Photos captions={["Tespit, B-C aksı", "Söküm öncesi", "Yeniden döşeme"]} />
      </Section>
    </>
  );
}

function MethodBody() {
  return (
    <>
      <Section title="Kapsam ve referanslar">
        <p className="text-[1.7cqw]">Asma tavan (alçıpan) uygulaması — satış alanı ve depo, +3,20 kotu.</p>
        <p className="mt-[0.5cqw] text-[1.55cqw] text-ink-600">Referans: Mimari uygulama projesi A-310, üretici montaj talimatı.</p>
      </Section>
      <Section title="Uygulama adımları">
        <Table
          head={["#", "İş adımı", "Kontrol / kabul kriteri"]}
          align={["c", "l", "l"]}
          rows={[
            ["1", "Aks ve kot aplikasyonu", "Lazer ile ±2 mm"],
            ["2", "Askı ve ana taşıyıcı montajı", "Askı aralığı ≤ 120 cm"],
            ["3", "Tesisat geçişleri koordinasyonu", "MEP onayı alındı"],
            ["4", "Levha montajı ve derz", "Derz bandı, iki kat macun"],
          ]}
        />
      </Section>
      <Section title="Riskler ve önlemler">
        <Table
          head={["Tehlike", "Alınacak önlem"]}
          rows={[
            ["Yüksekte çalışma", "Seyyar iskele, korkuluk, KKD"],
            ["Toz", "Lokal emiş, maske"],
          ]}
        />
      </Section>
    </>
  );
}

function MaterialBody() {
  return (
    <>
      <div className="grid grid-cols-4 border-l border-t border-line-strong">
        <Info k="Malzeme / ürün" v="60×120 rektifiyeli porselen karo" span />
        <Info k="Kullanım yeri" v="Satış alanı zemini" span />
        <Info k="Marka / model" v="Kalebodur · Basalto Gri" span />
        <Info k="Şartname maddesi / poz no" v="Y.26.003/01" />
        <Info k="Miktar" v="850 m²" />
      </div>
      <Section title="Teknik uygunluk">
        <Table
          head={["Özellik", "Şartname değeri", "Önerilen ürün", "Sonuç"]}
          rows={[
            ["Kaymazlık", "R10", "R10", "Uygun"],
            ["Su emme", "≤ %0,5", "%0,1", "Uygun"],
            ["Ebat", "60×120", "60×120", "Uygun"],
            ["Renk", "Antrasit", "Koyu gri", "Eşdeğer"],
          ]}
        />
      </Section>
      <Section title="Ekli dokümanlar">
        <div className="grid grid-cols-2 gap-x-[3cqw] gap-y-[0.4cqw] text-[1.6cqw]">
          {[
            ["Teknik föy (TDS)", "Ekli"],
            ["Test raporları", "Ekli"],
            ["Sertifikalar (CE, TSE…)", "Ekli"],
            ["Numune", "Ekli değil"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-line py-[0.3cqw]">
              <span>{k}</span>
              <span className={v === "Ekli" ? "text-ok" : "text-ink-400"}>{v}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Açıklamalar ve görüş">
        <p className="text-[1.65cqw]">
          <span className="font-semibold text-ink-950">Notlu onay (B)</span> — Renk numunesi sahada onaylanacak.
        </p>
      </Section>
    </>
  );
}

function ChecklistBody() {
  const groups: [string, [string, "ok" | "nok" | "na"][]][] = [
    [
      "Mimari / ince işler",
      [
        ["Asma tavan askıları, karkası ve kotu uygun", "ok"],
        ["Seramik / karo derz, kot ve şev kontrolü yapıldı", "nok"],
        ["Boya astarı, kat sayısı ve rengi uygun", "ok"],
      ],
    ],
    [
      "Elektrik",
      [
        ["Panolar etiketli, bağlantılar sıkılmış", "ok"],
        ["Acil aydınlatma ve yönlendirmeler çalışıyor", "ok"],
        ["Jeneratör / UPS devreye alındı", "na"],
      ],
    ],
    [
      "Mekanik",
      [
        ["Yangın dolapları ve söndürücüler yerinde", "ok"],
        ["Klima / ısıtma cihazları devreye alındı", "ok"],
      ],
    ],
  ];
  return (
    <>
      <div className="flex items-baseline justify-between text-[1.7cqw]">
        <span className="font-semibold text-ink-950">Mağaza açılış öncesi kontrol · Teslim öncesi</span>
        <span className="font-mono text-[1.5cqw] text-ink-500">6 uygun · 1 uygun değil · 1 kapsam dışı</span>
      </div>
      {groups.map(([g, items]) => (
        <Section key={g} title={g}>
          <div className="divide-y divide-line border-y border-line">
            {items.map(([t, v]) => (
              <div key={t} className="flex items-center justify-between gap-[2cqw] py-[0.55cqw] text-[1.65cqw]">
                <span className="flex items-center gap-[1.2cqw]">
                  <span className={cn("inline-block size-[1.8cqw] border", v === "ok" ? "border-ok bg-ok" : v === "nok" ? "border-risk" : "border-ink-300")} />
                  {t}
                </span>
                <Mark v={v} />
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
