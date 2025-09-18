import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Configurar headers para XML
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600'); // Cache por 1 hora

  try {
    // Leer posts del blog desde blogPosts.json
    const blogPostsPath = path.join(process.cwd(), 'blogPosts.json');
    let blogPosts = [];
    
    if (fs.existsSync(blogPostsPath)) {
      const fileContent = fs.readFileSync(blogPostsPath, 'utf8');
      blogPosts = JSON.parse(fileContent);
    }

    // URLs estáticas principales del sitio
    const staticPages = [
      {
        url: 'https://pantom.net/',
        priority: '1.0',
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/contacto',
        priority: '0.9',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/servicios',
        priority: '0.9',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/servicios/bases-de-datos',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/servicios/desarrollo-web',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/servicios/estrategia-digital',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/servicios/seo',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/nosotros',
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/blog',
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/automatizaciones',
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/enfoque',
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        url: 'https://pantom.net/privacidad',
        priority: '0.5',
        changefreq: 'yearly',
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];

    // Generar XML del sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    <lastmod>${page.lastmod}</lastmod>
  </url>`).join('')}
  ${blogPosts.map(post => `
  <url>
    <loc>${post.url}</loc>
    <priority>${post.priority || '0.7'}</priority>
    <changefreq>monthly</changefreq>
    <lastmod>${post.date || new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generando sitemap:', error);
    res.status(500).send('Error generando sitemap');
  }
}
