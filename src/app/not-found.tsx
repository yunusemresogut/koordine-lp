import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { features } from "@/content/features";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Aradığınız sayfa taşınmış veya kaldırılmış olabilir.",
  // Kök layout'taki "index, follow" değerini ezer (Next ayrıca kendi noindex etiketini ekler)
  robots: { index: false, follow: true },
};

/** Marka diline uygun 404: pafta antedi düzeninde, sakin bir yönlendirme. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
      <Container size="wide" className="relative py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">
              <span className="text-brand-700">404</span>
              <span aria-hidden className="h-px w-6 bg-line-strong" />
              <span>Pafta bulunamadı</span>
            </p>
            <h1
              id="nf-title"
              className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-[3.5rem]"
            >
              Bu adreste çizili bir sayfa yok.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">
              Bağlantı eski olabilir ya da sayfa taşınmış olabilir. Aşağıdaki bağlantılardan devam edebilir veya bize{" "}
              <a href={`mailto:${site.email.support}`} className="text-brand-700 underline underline-offset-4">
                {site.email.support}
              </a>{" "}
              adresinden ulaşabilirsiniz.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/" arrow>
                Ana sayfaya dön
              </ButtonLink>
              <ButtonLink href="/iletisim" variant="secondary">
                İletişim
              </ButtonLink>
            </div>
          </div>

          {/* Pafta antedi */}
          <div className="lg:col-span-5">
            <div aria-hidden className="crop-marks border border-ink-950 bg-white font-mono text-[0.75rem] text-ink-950">
              <div className="flex items-end justify-between border-b border-ink-950 px-5 py-6">
                <span className="text-[4.5rem] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[5.5rem]">404</span>
                <span className="pb-2 text-right uppercase tracking-[0.14em] text-ink-500">
                  Durum
                  <br />
                  <span className="text-risk">Bulunamadı</span>
                </span>
              </div>
              <dl className="grid grid-cols-2">
                {[
                  ["Proje", "koordine.com.tr"],
                  ["Pafta no", "—"],
                  ["Ölçek", "1:1"],
                  ["Revizyon", "R00"],
                ].map(([k, v], i) => (
                  <div key={k} className={`px-5 py-3 ${i % 2 === 0 ? "border-r border-ink-950" : ""} ${i < 2 ? "border-b border-ink-950" : ""}`}>
                    <dt className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">{k}</dt>
                    <dd className="mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <nav aria-label="Önerilen sayfalar" className="mt-16 border-t border-line pt-10">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Modüller</p>
          <ul className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/ozellikler/${f.slug}`}
                  className="group flex items-baseline gap-3 border-b border-line py-3 text-[0.9375rem] text-ink-800 transition-colors duration-150 hover:text-ink-950"
                >
                  <span className="w-8 font-mono text-[0.6875rem] text-ink-400 group-hover:text-brand-700">{f.code}</span>
                  <span className="group-hover:underline group-hover:underline-offset-4">{f.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-ink-600">
            Tüm modüllere genel bakış için{" "}
            <Link href="/ozellikler" className="text-brand-700 underline underline-offset-4">
              Özellikler
            </Link>{" "}
            sayfasına, sık sorulan sorular için{" "}
            <Link href="/sss" className="text-brand-700 underline underline-offset-4">
              SSS
            </Link>{" "}
            sayfasına göz atın.
          </p>
        </nav>
      </Container>
    </section>
  );
}
