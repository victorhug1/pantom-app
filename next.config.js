/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pantom.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      // Cache headers para assets estáticos
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache headers para imágenes
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache headers para archivos de fuentes
      {
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache headers para CSS
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache headers para páginas SSR (más corto)
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Excluir páginas de la generación estática
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Configuración para excluir páginas dinámicas de la generación estática
  experimental: {
  //  isrMemoryCacheSize: 0,//descomentar para que no se cachee
  },
  // Optimizaciones de bundle
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimización de webpack
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimizar chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };

      // Optimizar para navegadores modernos
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false, // Deshabilitar polyfills innecesarios
      };
    }
    return config;
  },
  // Excluir rutas específicas de la generación estática
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/404',
        has: [
          {
            type: 'query',
            key: 'slug',
            value: '(?!categoria|post).*',
          },
        ],
      },
      // Rewrites para archivos SEO
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/blog/slots/:slug*',
        destination: '/404',
        permanent: false,
      },
    ];
  }
};

module.exports = nextConfig;