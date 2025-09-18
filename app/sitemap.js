export default function sitemap() {
    return [
      {
        url: 'https://pantom.net/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: 'https://pantom.net/servicios',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://pantom.net/blog',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }
      // 👉 agrega aquí dinámicamente tus posts del blog si quieres
    ]
  }
  