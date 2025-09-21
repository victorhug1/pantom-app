import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ContactForm from '@/components/ContactForm';
import NewsletterForm from '@/components/NewsletterForm';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Contacto() {
  const { asPath } = useRouter();
  const hasParams = asPath.includes('?');
  
  const title = 'Contacto';
  const description = 'Hablemos sobre tus objetivos. Responderemos en menos de 24 horas.';
  const url = 'https://pantom.net/contacto';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: 'Pantom Digital Studio'
    }
  };

  return (
    <Layout>
      <SEO
        title={`${title} | Pantom Digital Studio`}
        description={description}
        ogImage={'/og-image.jpg'}
        ogUrl={url}
        canonicalUrl={url}
        type="website"
        structuredData={structuredData}
        forceCanonical={true}
      />
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">{title}</h1>
        <p className="text-lg text-gray-300 mb-10">{description}</p>
        <ContactForm />
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">Agenda una llamada</h3>
        <div className="bg-[#171717] rounded-2xl p-6 border border-[#262626]">
          <iframe
            src="https://calendly.com/digitalstudiopantom"
            className="w-full h-[720px] rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">También puedes suscribirte</h3>
        <NewsletterForm dark />
      </section>
    </Layout>
  );
}


