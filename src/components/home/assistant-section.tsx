import { AssistantMockup } from "@/components/mockups";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { assistantPoints } from "@/content/home";

/**
 * Yapay zekâ asistanı: ölçülü anlatım. Önerir, siz onaylarsınız.
 */
export function AssistantSection() {
  return (
    <section aria-labelledby="ai-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-5">
              Yapay zekâ asistanı
            </Eyebrow>
            <h2 id="ai-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Kayıtlarınıza soru sorun, eklemeleri siz onaylayın.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600 sm:text-lg">
              &ldquo;Önümüzdeki 30 günde hangi sahalar açılıyor?&rdquo; gibi bir soruyu Koordine&apos;ye Sor
              asistanına yazarsınız ya da söylersiniz, asistan firmanızın kayıtlarına bakarak cevap verir.
            </p>

            <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2">
              {assistantPoints.map((p) => (
                <li key={p.title} className="border-b border-r border-line bg-white p-5">
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink-950">{p.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{p.body}</p>
                </li>
              ))}
            </ul>
            <TextLink href="/ozellikler/yapay-zeka-asistani" className="mt-8">
              Yapay zekâ asistanı
            </TextLink>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <div className="relative">
              <div aria-hidden className="crop-marks absolute -inset-4 text-ink-400" />
              <AssistantMockup className="relative" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
