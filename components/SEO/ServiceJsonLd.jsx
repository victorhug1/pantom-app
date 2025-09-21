import Head from 'next/head';

export default function ServiceJsonLd({ 
  name, 
  description, 
  serviceType, 
  offers = [] 
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "provider": {
      "@type": "Organization",
      "name": "Pantom Digital Studio",
      "url": "https://pantom.net"
    },
    "areaServed": "CO",
    "serviceType": serviceType,
    "description": description,
    ...(offers.length > 0 && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Paquetes ${serviceType}`,
        "itemListElement": offers.map(offer => ({
          "@type": "Offer",
          "name": offer.name,
          "priceCurrency": offer.currency || "USD",
          ...(offer.price && { "price": offer.price })
        }))
      }
    })
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </Head>
  );
}
