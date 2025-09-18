import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const fullUrl = pathname + search;
  const userAgent = request.headers.get('user-agent') || '';
  const method = request.method || 'GET';

  // === 1) LISTA BLANCA: buscadores, IA, social previews, mediciones ===
  // Permitimos GET/HEAD de estos agentes; otras métricas o POST no pasan por aquí.
  const allowedAgents = [
    // Google
    /Googlebot/i, /Google-InspectionTool/i, /GoogleOther/i,
    /Googlebot-Image/i, /Googlebot-Video/i, /AdsBot-Google/i, /Mediapartners-Google/i,

    // Microsoft / Bing
    /Bingbot/i, /BingPreview/i, /msnbot/i,

    // DuckDuckGo / Yandex / Apple / Asia
    /DuckDuckBot/i, /Yandex(Bot|Images|MobileBot)/i, /Applebot/i,
    /Baiduspider/i, /Sogou/i, /PetalBot/i, /360Spider/i, /Yeti|NaverBot/i, /SeznamBot/i,

    // OpenAI (SearchGPT + crawler + browsing)
    /OAI-SearchBot/i, /GPTBot/i, /ChatGPT-User/i,

    // Anthropic
    /ClaudeBot/i, /Claude-User/i,

    // Perplexity
    /PerplexityBot/i,

    // You.com
    /YouBot/i,

    // DeepSeek
    /DeepSeekBot/i,

    // Common Crawl
    /CCBot/i,

    // Herramientas SEO / Link indexers
    /AhrefsBot/i, /SemrushBot/i, /MJ12bot/i, /DotBot/i, /rogerbot/i,

    // Social previews / mensajería
    /facebookexternalhit/i, /Facebot/i, /InstagramBot/i,
    /Twitterbot/i, /Slackbot/i, /Slackbot-LinkExpanding/i,
    /Discordbot/i, /DiscordBot/i, /LinkedInBot/i, /TelegramBot/i,
    /WhatsApp/i, /SkypeUriPreview/i, /Pinterestbot/i, /Yahoo Link Preview/i,

    // Medición de performance
    /Lighthouse/i, /Chrome-Lighthouse/i, /PageSpeed/i,
    /GTmetrix/i, /WebPageTest/i, /Pingdom/i,

    // Varios de ecosistema dev que hacen fetch de OG (proxies de imágenes)
    /github-camo/i
  ];

  if (method === 'GET' || method === 'HEAD') {
    if (allowedAgents.some(rx => rx.test(userAgent))) {
      return NextResponse.next();
    }
  }

  // === 2) LISTA NEGRA: scrapers genéricos y spam claro ===
  const suspiciousAgents = [
    /scrapy/i, /curl/i, /wget/i, /python-requests/i, /libwww-perl/i,
    /bot.*casino/i
  ];
  if (suspiciousAgents.some(rx => rx.test(userAgent))) {
    console.log(`🚨 BLOCKED SUSPICIOUS BOT: ${userAgent} - URL: ${fullUrl}`);
    return new NextResponse('Access denied', { status: 403 });
  }

  // === 3) SPAM en blog/slug (reducido a contextos concretos para evitar falsos positivos) ===
  const spamKeywords = [
    'casino', 'bet', 'poker', 'gambling', 'slottica', 'ggbet',
    'pin-up', '1xbet', 'bonus', 'jackpot', 'roulette', 'blackjack',
    'slots', 'oficjalna', 'strona', 'zaklady', 'sportowe', 'kasyno',
    'turkiye', 'giris', 'kazanin', 'telecharger', 'burkina', 'faso',
    'classement', 'meilleurs', 'sites'
  ];

  // Sólo aplicamos keywords spam dentro de /blog/
  if (pathname.startsWith('/blog/')) {
    if (spamKeywords.some(k => fullUrl.toLowerCase().includes(k))) {
      console.log(`🚨 BLOCKED SPAM BLOG URL: ${fullUrl} - IP: ${request.ip}`);
      return new NextResponse('Content not found', { status: 410 });
    }
  }

  // Bloqueo de slug raíz tipo "/casino"
  if (/^\/[^/]+$/.test(pathname) && pathname !== '/') {
    const slug = pathname.slice(1);
    if (spamKeywords.some(w => slug.toLowerCase().includes(w))) {
      console.log(`🚨 BLOCKED SPAM SLUG: ${slug} - IP: ${request.ip}`);
      return new NextResponse('Gone', { status: 410 });
    }
  }

  // === 4) PATRONES MALICIOSOS (mantener fuerte) ===
  const maliciousPatterns = [
    /\.\./, /<script/i, /javascript:/i, /data:/i, /vbscript:/i,
    /onload=/i, /onerror=/i, /eval\(/i, /expression\(/i, /import\s+/i, /require\s*\(/i
  ];
  const urlString = request.url || '';
  if (maliciousPatterns.some(rx => rx.test(urlString))) {
    console.log(`🚨 Malicious request blocked: ${urlString}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Validación sintáctica de slugs de blog
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/blog/')[1];
    if (slug && !/^[a-zA-Z0-9-]+$/.test(slug)) {
      console.log(`🚨 Invalid blog slug blocked: ${slug}`);
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // === 5) CABECERAS DE SEGURIDAD ===
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

// Importante: excluimos robots.txt y sitemaps para evitar bloqueos a crawlers
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap.*\\.xml).*)',
  ],
};
