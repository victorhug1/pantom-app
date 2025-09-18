export default function robots() {
    return {
      rules: [
        // Regla general
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/_next/', '/static/', '/private/', '/*?*session=']
        },
        // Motores de búsqueda principales
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: 'Google-InspectionTool', allow: '/' },
        { userAgent: 'GoogleOther', allow: '/' },
        { userAgent: 'Bingbot', allow: '/' },
        { userAgent: 'BingPreview', allow: '/' },
        { userAgent: 'DuckDuckBot', allow: '/' },
        { userAgent: 'YandexBot', allow: '/' },
        { userAgent: 'YandexImages', allow: '/' },
        { userAgent: 'YandexMobileBot', allow: '/' },
        { userAgent: 'Applebot', allow: '/' },
  
        // IA / LLM crawlers
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'OAI-SearchBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'Claude-User', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'YouBot', allow: '/' },
        { userAgent: 'DeepSeekBot', allow: '/' },
        { userAgent: 'CCBot', allow: '/' },
  
        // Herramientas SEO
        { userAgent: 'AhrefsBot', allow: '/', crawlDelay: 5 },
        { userAgent: 'SemrushBot', allow: '/', crawlDelay: 5 },
        { userAgent: 'MJ12bot', allow: '/', crawlDelay: 5 },
        { userAgent: 'DotBot', allow: '/', crawlDelay: 5 },
  
        // Previews sociales / mensajería
        { userAgent: 'facebookexternalhit', allow: '/' },
        { userAgent: 'Facebot', allow: '/' },
        { userAgent: 'InstagramBot', allow: '/' },
        { userAgent: 'Twitterbot', allow: '/' },
        { userAgent: 'LinkedInBot', allow: '/' },
        { userAgent: 'Slackbot', allow: '/' },
        { userAgent: 'Slackbot-LinkExpanding', allow: '/' },
        { userAgent: 'Discordbot', allow: '/' },
        { userAgent: 'TelegramBot', allow: '/' },
        { userAgent: 'WhatsApp', allow: '/' },
        { userAgent: 'Pinterestbot', allow: '/' },
        { userAgent: 'Yahoo Link Preview', allow: '/' },
  
        // Medición de performance
        { userAgent: 'Lighthouse', allow: '/' },
        { userAgent: 'Chrome-Lighthouse', allow: '/' },
        { userAgent: 'PageSpeed', allow: '/' },
        { userAgent: 'GTmetrix', allow: '/' },
        { userAgent: 'WebPageTest', allow: '/' },
        { userAgent: 'Pingdom', allow: '/' },
  
        // Proxies de imágenes
        { userAgent: 'github-camo', allow: '/' },
      ],
      sitemap: 'https://pantom.net/sitemap.xml',
      host: 'https://pantom.net'
    }
  }
  