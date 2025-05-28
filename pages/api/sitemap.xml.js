import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');

    // Obtener leads (ejemplo: puedes obtener otros datos también)
    const leads = await db.collection('leads').find({}).toArray();

    // Generar el XML del sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Agregar URLs estáticas
    sitemap += `  <url>\n`;
    sitemap += `    <loc>https://pantom.net/</loc>\n`;
    sitemap += `    <changefreq>daily</changefreq>\n`;
    sitemap += `    <priority>1.0</priority>\n`;
    sitemap += `  </url>\n`;
    sitemap += `  <url>\n`;
    sitemap += `    <loc>https://pantom.net/blog</loc>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;

    // Agregar URLs dinámicas (ejemplo con leads)
    leads.forEach(lead => {
      // Asegúrate de tener un campo en lead que pueda formar una URL única si aplica
      // Por ejemplo, si cada lead tuviera una página pública:
      // if (lead.slug) {
      //   sitemap += `  <url>\n`;
      //   sitemap += `    <loc>https://pantom.net/leads/${lead.slug}</loc>\n`;
      //   sitemap += `    <changefreq>monthly</changefreq>\n`;
      //   sitemap += `    <priority>0.7</priority>\n`;
      //   sitemap += `  </url>\n`;
      // }
    });

    sitemap += `</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
} 