import Link from "next/link";
import { Fragment } from "react";
import { Arrow, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/section-header";
import { featureDetailBySlug, featureGroups, featuresWithDetails, type FeatureWithDetail } from "@/content/feature-details";
import type { FeatureSlug } from "@/content/features";
import { cn, pad2 } from "@/lib/utils";
import { FeatureVisual, isDocumentVisual } from "./feature-visual";

/* ------------------------------------------------------------------ Hero yanı: grup dizini */

export function FeaturesSheetIndex() {
  return (
    <nav aria-label="Modül grupları" className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="flex items-center justify-between border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span className="text-ink-500">Pafta dizini</span>
        <span className="text-brand-700">M / {pad2(featuresWithDetails.length)}</span>
      </div>
      <ol className="divide-y divide-line">
        {featureGroups.map((g) => (
          <li key={g.id}>
            <a
              href={`#${g.id}`}
              className="group/btn grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-paper"
            >
              <span className="font-mono text-[0.75rem] text-brand-700">{g.code}</span>
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-medium text-ink-900">{g.name}</span>
                <span className="block truncate font-mono text-[0.6875rem] tracking-[0.08em] text-ink-500">
                  {g.slugs.map((s) => featureDetailBySlug(s)?.code).join(" · ")}
                </span>
              </span>
              <Arrow className="rotate-90 text-ink-400 group-hover/btn:text-brand-700" />
            </a>
          </li>
        ))}
      </ol>
      <div className="border-t border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">
        9 modül · 6 rapor tipi · 5 para birimi · TR / EN
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ Gruplu modül dizini */

export function FeatureGroupsSection({ index }: { index: string }) {
  let n = 0;
  return (
    <section aria-labelledby="moduller" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            id="moduller"
            index={index}
            eyebrow="Modüller"
            align="split"
            title="Beş çalışma alanında dokuz modül."
            lede="Modüller işin türüne göre gruplanmıştır. İstediğinizle başlarsınız; kullanmadığınız bazı modülleri firma ayarlarından kapatabilirsiniz."
          />
        </Reveal>

        <div className="mt-16 space-y-20">
          {featureGroups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <Reveal className="grid gap-4 border-t-2 border-ink-950 pt-5 sm:grid-cols-[4rem_minmax(0,1fr)] lg:grid-cols-[4rem_minmax(0,18rem)_minmax(0,1fr)] lg:gap-8">
                <span aria-hidden className="font-mono text-[2.5rem] font-medium leading-none text-ink-200">
                  {g.code}
                </span>
                <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.015em] text-ink-950">{g.name}</h3>
                <p className="max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-600 sm:col-start-2 lg:col-start-auto">{g.summary}</p>
              </Reveal>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {g.slugs.map((slug) => {
                  const f = featureDetailBySlug(slug);
                  if (!f) return null;
                  const flip = n++ % 2 === 1;
                  return <ModuleRow key={slug} feature={f} flip={flip} />;
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ModuleRow({ feature, flip }: { feature: FeatureWithDetail; flip: boolean }) {
  const { detail } = feature;
  const key = detail.visual.key;
  const doc = isDocumentVisual(key);
  return (
    <li>
      <Reveal className="grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-14">
        <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
            <span className="text-brand-700">M-{pad2(feature.index + 1)}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>{feature.code}</span>
          </p>
          <h4 className="mt-4 flex items-center gap-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950">
            <FeatureIcon name={feature.icon} className="size-6 shrink-0 text-ink-500" />
            <Link href={`/ozellikler/${feature.slug}`} className="transition-colors duration-200 hover:text-brand-700">
              {feature.name}
            </Link>
          </h4>
          <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{detail.hero.lede}</p>
          <dl className="mt-6 border-t border-line">
            {detail.sheet.slice(0, 2).map((row) => (
              <div key={row.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-2.5">
                <dt className="font-mono text-[0.6875rem] uppercase leading-6 tracking-[0.12em] text-ink-500">{row.label}</dt>
                <dd className="text-[0.9375rem] leading-6 text-ink-800">{row.value}</dd>
              </div>
            ))}
          </dl>
          <TextLink href={`/ozellikler/${feature.slug}`} className="mt-6" aria-label={`${feature.name} modülünü inceleyin`}>
            Modülü inceleyin
          </TextLink>
        </div>

        <Link
          href={`/ozellikler/${feature.slug}`}
          tabIndex={-1}
          aria-hidden
          className={cn("group/pv block lg:col-span-6", flip && "lg:order-1")}
        >
          <div className="relative h-[260px] overflow-hidden border border-line bg-paper sm:h-[320px]">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div
              className={cn(
                "mask-fade-b absolute inset-x-5 top-5 transition-transform duration-200 ease-out group-hover/pv:-translate-y-1",
                doc && "inset-x-auto left-1/2 w-[340px] max-w-[calc(100%-2.5rem)] -translate-x-1/2 group-hover/pv:-translate-x-1/2"
              )}
            >
              <FeatureVisual visual={key} className={cn(doc && "shadow-panel")} />
            </div>
            <span className="absolute bottom-3 right-3 rounded-xs border border-line-strong bg-white px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-ink-600">
              ŞEKİL {feature.code}.1
            </span>
          </div>
        </Link>
      </Reveal>
    </li>
  );
}

/* ------------------------------------------------------------------ Platform genelinde */

const PLATFORM: { figure: string; title: string; body: string; href?: string }[] = [
  {
    figure: "TR / EN",
    title: "İki arayüz dili",
    body: "Dil üst menüden değiştirilir ve cihazda saklanır; aynı firmada farklı dillerde çalışan kullanıcılar olabilir.",
  },
  {
    figure: "05",
    title: "Para birimi",
    body: "TRY, USD, EUR, GBP ve CHF. Her kayıt kendi birimini taşır; kur çevrimi yapılmaz, toplamlar birim başına ayrıdır.",
    href: "/ozellikler/hakedis-ve-finans",
  },
  {
    figure: "09",
    title: "Hazır rol, ayrıca özel roller",
    body: "15 bölümün her birinde görüntüle, ekle, düzenle, sil yetkisi rol ve kullanıcı bazında ayrı açılır.",
    href: "/ozellikler/ekip-ve-iletisim",
  },
  {
    figure: "01",
    title: "Aktif oturum",
    body: "Aynı hesapla başka bir yerden giriş yapıldığında önceki oturum kapanır ve kullanıcıya nedeni söylenir.",
  },
  {
    figure: "17",
    title: "Bildirim türü",
    body: "Açılış, sözleşme, hakediş, fatura, talep, belge, izin, duyuru ve araç bildirimleri; uygulama içinde ve masaüstünde.",
    href: "/ozellikler/ekip-ve-iletisim",
  },
  {
    figure: ".xlsx · .xer",
    title: "Excel ve P6",
    body: "Keşif ve iş planı Excel'den, iş planı ayrıca Primavera P6 .xer dosyasından içe aktarılır. Puantaj ve İK raporu Excel olarak alınır.",
    href: "/ozellikler/kesif-ve-is-programi",
  },
  {
    figure: "A4",
    title: "PDF çıktı",
    body: "Altı rapor tipi aynı antet, bilgi ızgarası, fotoğraf ve imza düzeninde A4 belge olarak önizlenir ve PDF olarak alınır.",
    href: "/ozellikler/saha-raporlari",
  },
  {
    figure: "ON / OFF",
    title: "Modül seçimi",
    body: "Tadilat talepleri, sözleşmeler, hakediş, faturalar, ekip sohbeti, İK ve asistan firma ayarlarından kapatılabilir; kayıtlar silinmez.",
  },
];

export function PlatformSection({ index }: { index: string }) {
  return (
    <section aria-labelledby="platform" className="border-b border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            id="platform"
            index={index}
            eyebrow="Platform genelinde"
            align="split"
            title="Her modülde aynı kalan kurallar."
            lede="Dil, para birimi, yetki, oturum, bildirim ve dosya biçimleri modülden modüle değişmez. Sayılar ürünün kendisinden gelir."
          />
        </Reveal>
        <Reveal className="mt-14 grid border-l border-t border-line-strong bg-white sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM.map((p, i) => {
            const body = (
              <>
                <span className="flex h-4 items-center justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400">
                  <span>P.{pad2(i + 1)}</span>
                  {p.href && <Arrow className="text-ink-300 group-hover/btn:text-brand-700" />}
                </span>
                <span className="mt-5 block font-mono text-[2rem] font-medium leading-none tracking-[-0.02em] text-ink-950">{p.figure}</span>
                <span className="mt-4 block text-[1.0625rem] font-semibold text-ink-950">{p.title}</span>
                <span className="mt-2 block text-pretty text-[0.9375rem] leading-relaxed text-ink-600">{p.body}</span>
              </>
            );
            const cls = "group/btn block h-full border-b border-r border-line-strong px-5 py-6 sm:px-6";
            return (
              <div key={p.title}>
                {p.href ? (
                  <Link href={p.href} className={cn(cls, "transition-colors duration-200 hover:bg-brand-50/50")}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ Bağlantı matrisi */

/** Her modül sayfasındaki bağlantılardan türetilir: satır → sütun (veri akışı) */
function buildEdges() {
  const edges = new Map<string, string>();
  for (const f of featuresWithDetails) {
    for (const c of f.detail.connections) {
      const [from, to] = c.dir === "out" ? [f.slug, c.feature] : [c.feature, f.slug];
      const k = `${from}>${to}`;
      if (!edges.has(k)) edges.set(k, c.record);
    }
  }
  return edges;
}

export function ConnectionMatrixSection({ index }: { index: string }) {
  const edges = buildEdges();
  const list = featuresWithDetails;
  const has = (a: FeatureSlug, b: FeatureSlug) => edges.get(`${a}>${b}`);

  return (
    <section aria-labelledby="matris" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeader
            id="matris"
            index={index}
            eyebrow="Bağlantı matrisi"
            tone="dark"
            align="split"
            title="Veri bir modülde girilir, diğerlerinde kullanılır."
            lede="Satırdaki modülün kaydı, sütundaki modüle akar. Her işaret, modül sayfalarında ayrıntısıyla anlatılan gerçek bir bağlantıdır."
          />
        </Reveal>
        <Reveal className="mt-14 border border-line-dark bg-ink-950/70">
          <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400 sm:px-6">
            <span>Kaynak → hedef</span>
            <span className="text-brand-300">{edges.size} bağlantı</span>
          </div>
          <div className="relative overflow-x-auto px-4 py-6 sm:px-6">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">Modüller arası veri akışı: satırdaki modülden sütundaki modüle</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-48 pb-3 text-left font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ink-400">
                    Kaynak
                  </th>
                  {list.map((f) => (
                    <th key={f.slug} scope="col" className="pb-3 text-center font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-ink-300">
                      <abbr title={f.name} className="no-underline">
                        {f.code}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((row) => (
                  <tr key={row.slug} className="border-t border-line-dark">
                    <th scope="row" className="py-2.5 pr-4 text-left font-normal">
                      <Link href={`/ozellikler/${row.slug}`} className="group/btn flex items-baseline gap-3 text-[0.875rem] text-ink-200 hover:text-white">
                        <span className="w-8 font-mono text-[0.6875rem] text-brand-300">{row.code}</span>
                        <span className="truncate">{row.name}</span>
                      </Link>
                    </th>
                    {list.map((col) => {
                      const rec = row.slug === col.slug ? null : has(row.slug, col.slug);
                      return (
                        <td key={col.slug} className="border-l border-line-dark/60 py-2.5 text-center">
                          {row.slug === col.slug ? (
                            <span aria-hidden className="inline-block h-px w-4 rotate-45 bg-white/20" />
                          ) : rec ? (
                            <Fragment>
                              <span aria-hidden title={rec} className="inline-block size-2.5 bg-brand-400" />
                              <span className="sr-only">
                                {row.name} → {col.name}: {rec}
                              </span>
                            </Fragment>
                          ) : (
                            <span className="sr-only">Bağlantı yok</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Eyebrow tone="dark" className="mt-6">
          Ayrıntı için her modül sayfasındaki 04 · Bağlantılar bölümüne bakın
        </Eyebrow>
      </Container>
    </section>
  );
}
