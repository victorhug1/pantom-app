/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pantom.net',
  generateRobotsTxt: false,
  generateIndexSitemap: false, // ✅ Deshabilitar generación automática
  exclude: ['/api/*', '/admin/*', '/*'], // ✅ Excluir todo para usar sitemap manual
  additionalPaths: async () => [], // ✅ Sin rutas adicionales automáticas
};
