import Script from 'next/script';

const ENABLE_GTM = process.env.NEXT_PUBLIC_ENABLE_GTM === 'true';
const ENABLE_GTAG = process.env.NEXT_PUBLIC_ENABLE_GTAG === 'true';
const ENABLE_HOTJAR = process.env.NEXT_PUBLIC_ENABLE_HOTJAR === 'true';
const ENABLE_CS = process.env.NEXT_PUBLIC_ENABLE_CONTENTSQUARE === 'true';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const CS_SITEID = process.env.NEXT_PUBLIC_CS_SITEID;

export default function Analytics() {
  return (
    <>
      {ENABLE_GTM && GTM_ID && (
        <Script
          id="gtm"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="lazyOnload"
        />
      )}

      {ENABLE_GTAG && GA4_ID && (
        <>
          <Script
            id="gtag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="lazyOnload"
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {ENABLE_HOTJAR && HOTJAR_ID && (
        <Script id="hotjar" strategy="lazyOnload">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {ENABLE_CS && CS_SITEID && (
        <Script
          id="contentsquare"
          src={`https://t.contentsquare.net/uxa/${CS_SITEID}.js`}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
