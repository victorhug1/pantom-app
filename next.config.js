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
    MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY,
    MAILERSEND_TEMPLATE_ID: process.env.MAILERSEND_TEMPLATE_ID,
    MAILERSEND_FROM_EMAIL: process.env.MAILERSEND_FROM_EMAIL,
    MAILERSEND_FROM_NAME: process.env.MAILERSEND_FROM_NAME
  }
};

module.exports = nextConfig;