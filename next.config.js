/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pantom.net'],
  },
  async headers() {
    return [
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // i18n: {
  //   locales: ['es', 'en'],
  //   defaultLocale: 'es',
  // },
  // Excluir páginas de la generación estática
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Configuración para excluir páginas dinámicas de la generación estática
  experimental: {
  //  isrMemoryCacheSize: 0,//descomentar para que no se cachee
  },
  // Excluir rutas específicas de la generación estática
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/blog/[slug]',
      },
    ];
  },
  env: {
    MAILERSEND_API_KEY: 'mlsn.f4b3dab0872b733e9d404cdd0e12093cee5cc380a7601ee4896b769826210edc',
    MAILERSEND_TEMPLATE_ID: process.env.MAILERSEND_TEMPLATE_ID,
    MAILERSEND_FROM_EMAIL: 'hola@pantom.net',
    MAILERSEND_FROM_NAME: 'Pantom',
    MAILERSEND_SMTP_USER: 'MS_EiuBe8@pantom.net',
    MAILERSEND_SMTP_PASS: 'mssp.IqQHDEC.3yxj6ljq9wxgdo2r.TvOaLjQ',
    MAILERSEND_SMTP_HOST: 'smtp.mailersend.net',
    MAILERSEND_SMTP_PORT: '587'
  }
};

module.exports = nextConfig;