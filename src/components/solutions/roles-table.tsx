import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import type { SolutionDetail } from "@/content/solution-details";

/**
 * "Kim ne görür": rol / görür / yapar tablosu. Dar ekranda her satır bir bloğa döner
 * (thead görsel olarak gizlenir, hücre etiketleri satır içinde gösterilir).
 */
export function RolesTable({ roles }: { roles: SolutionDetail["roles"] }) {
  return (
    <section aria-labelledby="kim-ne-gorur" className="border-t border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">Kim ne görür</Eyebrow>
            <h2
              id="kim-ne-gorur"
              className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
            >
              Her rol kendi işini görür, yönetim tamamını.
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              Tablo, uygulamadaki hazır rollerin varsayılan yetkilerini gösterir. Rol adlarını ve yetkileri firmanıza göre değiştirebilirsiniz.{" "}
              <Link href="/ozellikler/ekip-ve-iletisim" className="text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700">
                Roller ve yetkiler
              </Link>
            </p>
          </div>

          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left max-lg:block">
              <caption className="sr-only">Rollerin gördüğü bilgiler ve sorumlulukları</caption>
              <thead className="max-lg:sr-only">
                <tr className="border-b border-ink-950 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                  <th scope="col" className="w-[30%] py-3 pr-6 font-medium">
                    Rol
                  </th>
                  <th scope="col" className="w-[35%] py-3 pr-6 font-medium">
                    Ne görür
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Ne yapar
                  </th>
                </tr>
              </thead>
              <tbody className="max-lg:block max-lg:border-t max-lg:border-ink-950">
                {roles.map((r, i) => (
                  <tr key={r.role + i} className="border-b border-line align-top max-lg:grid max-lg:gap-3 max-lg:py-6">
                    <th scope="row" className="py-6 pr-6 font-normal max-lg:p-0">
                      <span className="block text-[1.0625rem] font-semibold leading-snug text-ink-950">{r.label ?? r.role}</span>
                    </th>
                    <td className="py-6 pr-6 text-[0.9375rem] leading-relaxed text-ink-700 max-lg:p-0">
                      <span className="mb-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400 lg:hidden">
                        Ne görür
                      </span>
                      {r.sees}
                    </td>
                    <td className="py-6 text-[0.9375rem] leading-relaxed text-ink-700 max-lg:p-0">
                      <span className="mb-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400 lg:hidden">
                        Ne yapar
                      </span>
                      {r.does}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
