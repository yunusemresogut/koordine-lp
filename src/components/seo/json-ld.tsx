/** JSON-LD yapılandırılmış veri. "<" kaçışı, içerikte </script> kapanmasını önler. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
