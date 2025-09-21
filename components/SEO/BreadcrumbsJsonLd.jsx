import Head from "next/head";
import { useRouter } from "next/router";

export default function BreadcrumbsJsonLd({ items = [] }) {
  const router = useRouter();
  const base = "https://pantom.net";

  // items: [{ name: 'Inicio', url: '/' }, { name: 'Servicios', url: '/servicios' }]
  const itemList = items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: base + it.url
  }));

  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemList.length
      ? itemList
      : [{
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: base + router.pathname
        }]
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </Head>
  );
}
