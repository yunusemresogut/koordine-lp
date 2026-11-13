import { site } from "@/lib/site";

/**
 * Yasal metinlerde veri sorumlusu / hizmet sağlayıcı adı.
 * site.company.legalName doluysa ticari unvanı, değilse marka adını ("Koordine") yazar;
 * sayfada köşeli parantezli yer tutucu görünmez.
 */
export function LegalEntity() {
  return <>{site.company.legalName || site.name}</>;
}

/** Firma kimlik bilgileri: yalnızca dolu alanlar listelenir. */
export function LegalEntityDetails() {
  const c = site.company;
  const rows = [
    ["Unvan", c.legalName || site.name],
    ["Adres", c.address ? [c.address, c.city].filter(Boolean).join(", ") : ""],
    ["MERSİS no", c.mersis],
    ["Vergi dairesi / no", [c.taxOffice, c.taxNumber].filter(Boolean).join(" / ")],
    ["KEP adresi", c.kepAddress],
    ["Telefon", c.phone],
  ].filter(([, v]) => v);

  return (
    <ul>
      {rows.map(([k, v]) => (
        <li key={k}>
          <strong>{k}:</strong> {v}
        </li>
      ))}
      <li>
        <strong>E-posta:</strong> <a href={`mailto:${site.email.support}`}>{site.email.support}</a>
      </li>
      <li>
        <strong>İnternet sitesi:</strong> <a href={site.url}>{site.url.replace(/^https?:\/\//, "")}</a>
      </li>
    </ul>
  );
}
