import Head from "next/head";

export default function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pantom Digital Studio",
    "url": "https://pantom.net",
    "logo": "https://pantom.net/pantom_logo.svg",
    "sameAs": [
      "https://www.linkedin.com/company/pantom", 
      "https://twitter.com/pantomdigital"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "hola@pantom.net",
      "areaServed": "CO",
      "availableLanguage": ["es","en"]
    }]
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </Head>
  );
}
