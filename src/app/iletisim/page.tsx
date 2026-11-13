import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { appLinks, site } from "@/lib/site";

const title = "İletişim ve Demo Talebi";
const description =
  "Koordine demosu talep edin ya da destek ekibimize yazın. Saha, proje ve şantiye yönetimini kendi iş akışınız üzerinden birlikte inceleyelim.";

export const metadata = pageMetadata({ title, description, path: "/iletisim" });

const steps = [
  {
    title: "Ön görüşme",
    text: "Ekibinizi, projelerinizi ve şu an kullandığınız araçları dinleriz.",
  },
  {
    title: "Ürün gösterimi",
    text: "İlgilendiğiniz modülleri yaklaşık 30 dakikada, sizin işinize benzer bir örnekle gösteririz.",
  },
  {
    title: "Kurulum planı",
    text: "Roller, kullanılacak modüller ve Excel'den veri aktarımını birlikte planlarız.",
  },
  {
    title: "Teklif",
    text: "Kullanıcı sayınıza ve seçtiğiniz modüllere göre teklif hazırlarız.",
  },
];

export default function ContactPage() {
  const c = site.company;
  const phoneHref = c.phone ? `tel:${c.phone.replace(/[^\d+]/g, "")}` : "";

  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/iletisim" })} />
      <PageHero
        crumbs={[{ name: "İletişim", path: "/iletisim" }]}
        eyebrow="İletişim"
        title="Koordine'yi kendi projelerinizle görün."
        lede="Formu doldurun, size uygun bir zamanda görüşelim. Sorularınız için doğrudan e-posta da gönderebilirsiniz."
      />

      <section aria-labelledby="demo-title" className="bg-white">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Sol: iletişim bilgileri ve süreç */}
            <div className="lg:col-span-5">
              <Eyebrow>Doğrudan iletişim</Eyebrow>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                <ContactRow label="Destek ve satış">
                  <a
                    href={`mailto:${site.email.support}`}
                    className="text-lg font-medium text-ink-950 underline decoration-line-strong underline-offset-4 hover:decoration-ink-950"
                  >
                    {site.email.support}
                  </a>
                </ContactRow>
                {c.phone && (
                  <ContactRow label="Telefon">
                    <a href={phoneHref} className="text-lg font-medium text-ink-950 hover:text-brand-700">
                      {c.phone}
                    </a>
                  </ContactRow>
                )}
                {c.address && (
                  <ContactRow label="Adres">
                    <address className="not-italic leading-relaxed text-ink-800">
                      {c.address}
                      {c.city && <>, {c.city}</>}
                    </address>
                  </ContactRow>
                )}
                <ContactRow label="Mevcut kullanıcılar">
                  <a href={appLinks.login} className="font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800">
                    Uygulamaya giriş yapın
                  </a>
                </ContactRow>
              </dl>

              <div className="mt-14">
                <Eyebrow>Demo görüşmesi</Eyebrow>
                <h2 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.02em] text-ink-950">
                  Görüşmede neler olur?
                </h2>
                <ol className="mt-6 space-y-0">
                  {steps.map((s, i) => (
                    <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-7 last:pb-0">
                      {i < steps.length - 1 && (
                        <span aria-hidden className="absolute bottom-0 left-[1.25rem] top-9 w-px bg-line" />
                      )}
                      <span className="flex size-10 items-center justify-center rounded-sm border border-line-strong bg-paper font-mono text-[0.75rem] tabular-nums text-ink-700">
                        {i + 1}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-semibold text-ink-950">{s.title}</h3>
                        <p className="mt-1.5 text-pretty text-[0.9375rem] leading-relaxed text-ink-600">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sağ: demo formu */}
            <div id="demo" className="lg:col-span-7">
              <div className="crop-marks rounded-md border border-line bg-white p-6 text-ink-300 shadow-panel sm:p-10">
                <div className="text-ink-950">
                  <div className="border-b border-line pb-6">
                    <h2 id="demo-title" className="text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
                      Demo talep edin
                    </h2>
                  </div>
                  <div className="pt-6">
                    <ContactForm supportEmail={site.email.support} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Önce modülleri incelemek ister misiniz?"
        lede="9 modülün her biri için ayrı bir tanıtım sayfası var."
      />
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6">
      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
