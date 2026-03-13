import Head from 'next/head';
import { useEffect } from 'react';

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A96E;
    --gold-light: #E8CFA0;
    --black: #0A0A0A;
    --off-white: #F7F5F2;
    --gray-muted: #8A8A8A;
    --gray-border: #E0DDD8;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--sans) !important;
    background: var(--off-white) !important;
    color: var(--black) !important;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.2rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid rgba(201,169,110,0.2);
    transition: all 0.3s;
  }
  nav .logo {
    font-family: var(--serif);
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.15em;
    color: var(--gold);
    text-transform: uppercase;
  }
  nav ul { list-style: none; display: flex; gap: 2.5rem; }
  nav ul a {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(247,245,242,0.6);
    text-decoration: none;
    transition: color 0.2s;
  }
  nav ul a:hover { color: var(--gold); }

  #hero {
    min-height: 100vh;
    background: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }
  #hero::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 2rem;
    font-family: var(--sans);
    font-weight: 400;
  }
  .hero-name {
    font-family: var(--serif);
    font-size: clamp(4rem, 10vw, 9rem);
    font-weight: 300;
    line-height: 1;
    color: #F7F5F2;
    letter-spacing: -0.02em;
    margin-bottom: 0.3em;
  }
  .hero-name em { font-style: italic; color: var(--gold); }
  .hero-sub {
    font-family: var(--serif);
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    font-weight: 300;
    font-style: italic;
    color: rgba(247,245,242,0.5);
    margin-bottom: 3rem;
    max-width: 600px;
  }
  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 2.5rem;
    border: 0.5px solid var(--gold);
    color: var(--gold);
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: var(--sans);
    transition: all 0.3s;
    cursor: pointer;
    background: transparent;
  }
  .hero-cta:hover { background: var(--gold); color: var(--black); }
  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(247,245,242,0.3);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .hero-scroll-line {
    width: 0.5px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(201,169,110,0.6), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.1); }
  }

  section {
    padding: 7rem 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .section-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    font-family: var(--sans);
  }
  .section-title {
    font-family: var(--serif);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
    color: var(--black);
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-body {
    font-size: 17px;
    color: #444;
    line-height: 1.8;
    max-width: 640px;
    font-weight: 300;
  }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  .divider { width: 40px; height: 0.5px; background: var(--gold); margin: 2rem 0; }

  #objetivo {
    background: var(--black);
    max-width: 100%;
    padding: 7rem 3rem;
  }
  #objetivo .inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }
  #objetivo .section-title { color: #F7F5F2; }
  #objetivo .section-body { color: rgba(247,245,242,0.6); }
  #objetivo .section-eyebrow { color: var(--gold); }
  #objetivo .divider { background: var(--gold); }

  .stat-block { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .stat-item { border-top: 0.5px solid rgba(201,169,110,0.3); padding-top: 1.5rem; }
  .stat-number {
    font-family: var(--serif);
    font-size: 3.5rem;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 0.3rem;
  }
  .stat-label {
    font-size: 12px;
    letter-spacing: 0.08em;
    color: rgba(247,245,242,0.45);
    text-transform: uppercase;
    font-weight: 300;
  }

  .deliverables-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5px;
    background: var(--gray-border);
    margin-top: 4rem;
    border: 1.5px solid var(--gray-border);
  }
  .deliverable-item {
    background: var(--off-white);
    padding: 2.5rem;
    transition: background 0.3s;
  }
  .deliverable-item:hover { background: #fff; }
  .deliverable-number {
    font-family: var(--serif);
    font-size: 3rem;
    font-weight: 300;
    color: var(--gray-border);
    line-height: 1;
    margin-bottom: 1rem;
  }
  .deliverable-title {
    font-family: var(--serif);
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.8rem;
    color: var(--black);
  }
  .deliverable-body { font-size: 14px; color: var(--gray-muted); line-height: 1.7; font-weight: 300; }
  .deliverable-tag {
    display: inline-block;
    margin-top: 1.2rem;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    border-bottom: 0.5px solid var(--gold);
    padding-bottom: 2px;
  }

  #roadmap { background: var(--off-white); }
  .roadmap-timeline { margin-top: 4rem; position: relative; }
  .roadmap-timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0.5px;
    background: var(--gray-border);
  }
  .roadmap-step { padding-left: 3rem; padding-bottom: 3.5rem; position: relative; }
  .roadmap-step::before {
    content: '';
    position: absolute;
    left: -4px; top: 8px;
    width: 9px; height: 9px;
    border-radius: 50%;
    border: 0.5px solid var(--gold);
    background: var(--off-white);
  }
  .roadmap-step.active::before { background: var(--gold); }
  .roadmap-period { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .roadmap-step-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; margin-bottom: 0.7rem; }
  .roadmap-step-body { font-size: 14px; color: var(--gray-muted); max-width: 560px; line-height: 1.8; font-weight: 300; }

  #automatizacion { background: var(--black); max-width: 100%; padding: 7rem 3rem; }
  #automatizacion .inner { max-width: 1100px; margin: 0 auto; }
  #automatizacion .section-title { color: #F7F5F2; }
  #automatizacion .section-eyebrow { color: var(--gold); }
  #automatizacion .divider { background: rgba(201,169,110,0.4); }

  .auto-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: rgba(255,255,255,0.06);
    margin-top: 4rem;
    border: 1.5px solid rgba(255,255,255,0.06);
  }
  .auto-item { background: #111; padding: 2.5rem; transition: background 0.3s; }
  .auto-item:hover { background: #161616; }
  .auto-icon { width: 36px; height: 36px; margin-bottom: 1.5rem; opacity: 0.7; }
  .auto-title { font-family: var(--serif); font-size: 1.2rem; font-weight: 400; color: #F7F5F2; margin-bottom: 0.7rem; }
  .auto-body { font-size: 13px; color: rgba(247,245,242,0.45); line-height: 1.8; font-weight: 300; }

  #pricing { background: var(--off-white); }
  .pricing-wrapper {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 3rem;
    align-items: start;
  }
  .price-card { background: var(--black); padding: 3rem; position: relative; overflow: hidden; }
  .price-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--gold); }
  .price-label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 2rem; }
  .price-amount { font-family: var(--serif); font-size: 5rem; font-weight: 300; color: #F7F5F2; line-height: 1; margin-bottom: 0.2rem; }
  .price-currency { font-size: 1.5rem; color: var(--gold); vertical-align: super; font-family: var(--serif); }
  .price-type { font-size: 12px; color: rgba(247,245,242,0.4); letter-spacing: 0.1em; margin-bottom: 2.5rem; text-transform: uppercase; }
  .price-includes { border-top: 0.5px solid rgba(255,255,255,0.1); padding-top: 2rem; }
  .price-includes-title { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(247,245,242,0.4); margin-bottom: 1.2rem; }
  .price-includes li {
    list-style: none;
    font-size: 13px;
    color: rgba(247,245,242,0.7);
    padding: 0.5rem 0;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 300;
  }
  .price-includes li::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

  .production-table { background: #fff; border: 0.5px solid var(--gray-border); }
  .production-header { padding: 1.5rem 2rem; border-bottom: 0.5px solid var(--gray-border); }
  .production-header-title { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray-muted); }
  .production-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 1.2rem 2rem;
    border-bottom: 0.5px solid var(--gray-border);
    align-items: center;
    transition: background 0.2s;
  }
  .production-row:hover { background: var(--off-white); }
  .production-row:last-child { border-bottom: none; }
  .production-row-name { font-size: 14px; font-weight: 400; color: var(--black); margin-bottom: 2px; }
  .production-row-detail { font-size: 12px; color: var(--gray-muted); font-weight: 300; }
  .production-price { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--black); white-space: nowrap; text-align: right; }
  .production-note { padding: 1.2rem 2rem; font-size: 12px; color: var(--gray-muted); font-weight: 300; font-style: italic; border-top: 0.5px solid var(--gray-border); background: var(--off-white); }

  #porque { background: var(--black); max-width: 100%; padding: 7rem 3rem; text-align: center; }
  #porque .inner { max-width: 760px; margin: 0 auto; }
  #porque .section-title { color: #F7F5F2; font-size: clamp(2.5rem, 5vw, 5rem); }
  #porque .section-body { color: rgba(247,245,242,0.55); margin: 0 auto 3rem; max-width: 100%; font-size: 18px; }
  .quote-mark { font-family: var(--serif); font-size: 8rem; line-height: 0.5; color: var(--gold); opacity: 0.3; margin-bottom: 1rem; display: block; }
  .quote-text { font-family: var(--serif); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; font-style: italic; color: #F7F5F2; line-height: 1.5; margin-bottom: 2rem; }
  .quote-attr { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }

  #cta-final { background: var(--off-white); max-width: 100%; padding: 7rem 3rem; text-align: center; }
  #cta-final .inner { max-width: 640px; margin: 0 auto; }
  #cta-final .section-title { font-size: clamp(2.5rem, 5vw, 4rem); }
  .cta-btn {
    display: inline-block;
    margin-top: 2.5rem;
    padding: 1.1rem 3rem;
    background: var(--black);
    color: var(--off-white);
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.3s;
    cursor: pointer;
    border: none;
  }
  .cta-btn:hover { background: var(--gold); color: var(--black); }
  .cta-note { margin-top: 1.2rem; font-size: 12px; color: var(--gray-muted); letter-spacing: 0.05em; }

  footer {
    background: var(--black);
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.5px solid rgba(201,169,110,0.15);
  }
  .footer-brand { font-family: var(--serif); font-size: 13px; font-weight: 300; color: var(--gold); letter-spacing: 0.1em; }
  .footer-copy { font-size: 11px; color: rgba(247,245,242,0.3); letter-spacing: 0.05em; }

  @media (max-width: 768px) {
    nav { padding: 1.2rem 1.5rem; }
    nav ul { display: none; }
    section { padding: 5rem 1.5rem; }
    #objetivo .inner, .pricing-wrapper { grid-template-columns: 1fr; gap: 3rem; }
    .deliverables-grid, .auto-grid { grid-template-columns: 1fr; }
    .stat-block { grid-template-columns: 1fr 1fr; }
    footer { flex-direction: column; gap: 1rem; text-align: center; }
  }
`;

export default function PropuestaChefLorenMon() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Head>
        <title>Propuesta Estratégica — Chef Loren Mon</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* NAV */}
      <nav>
        <div className="logo">Chef Loren Mon &middot; Estrategia Digital</div>
        <ul>
          <li><a href="#objetivo">Objetivo</a></li>
          <li><a href="#entregables">Entregables</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#pricing">Inversión</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div id="hero">
        <div className="hero-eyebrow">Propuesta de Estrategia Digital &middot; 2026</div>
        <h1 className="hero-name">Chef <em>Loren</em><br />Mon</h1>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(247,245,242,0.35)', letterSpacing: '0.12em', marginTop: '0.4rem', marginBottom: '1.8rem' }}>
          Lorena Arcila
        </p>
        <p className="hero-sub">De perfil gastronómico a plataforma de captación de clientes de lujo en Miami.</p>
        <a href="#objetivo" className="hero-cta">Ver la estrategia</a>
        <div className="hero-scroll">
          <div className="hero-scroll-line"></div>
          <span>Scroll</span>
        </div>
      </div>

      {/* OBJETIVO */}
      <div id="objetivo">
        <div className="inner">
          <div>
            <div className="section-eyebrow reveal">01 &middot; Objetivo Core</div>
            <h2 className="section-title reveal reveal-delay-1">Tu Instagram<br />como máquina<br />de <em>ventas</em></h2>
            <div className="divider reveal reveal-delay-2"></div>
            <p className="section-body reveal reveal-delay-2">
              Transformar tu perfil de Instagram en una plataforma de captación de clientes de lujo para eventos privados y yates en Miami — delegando la operatividad técnica para que te concentres en la experiencia gastronómica.
            </p>
          </div>
          <div className="stat-block reveal reveal-delay-3">
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">semana &middot; entrega del brief</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">90</div>
              <div className="stat-label">días &middot; tracción esperada</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">año &middot; horizonte de escala</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">saturación operativa (meta)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ENTREGABLES */}
      <section id="entregables">
        <div className="section-eyebrow reveal">02 &middot; El Entregable Principal</div>
        <h2 className="section-title reveal reveal-delay-1">El <em>Brief</em><br />Estratégico</h2>
        <p className="section-body reveal reveal-delay-2">Un documento maestro que contiene todo lo que tu marca necesita para dominar el mercado de private chefs en Florida.</p>
        <div className="deliverables-grid">
          <div className="deliverable-item reveal">
            <div className="deliverable-number">01</div>
            <div className="deliverable-title">Arquitectura de Marca</div>
            <div className="deliverable-body">Definición de tu propuesta de valor única frente a la competencia en Florida. Quién eres, qué ofreces y por qué un cliente de lujo debería elegirte.</div>
            <span className="deliverable-tag">Posicionamiento</span>
          </div>
          <div className="deliverable-item reveal reveal-delay-1">
            <div className="deliverable-number">02</div>
            <div className="deliverable-title">Plan Maestro de Contenidos</div>
            <div className="deliverable-body">Guía táctica de qué comunicar en cada etapa del funnel: Atracción, Consideración y Venta. Qué publicar, cuándo y por qué.</div>
            <span className="deliverable-tag">Contenido</span>
          </div>
          <div className="deliverable-item reveal reveal-delay-2">
            <div className="deliverable-number">03</div>
            <div className="deliverable-title">Estrategia SEO Local</div>
            <div className="deliverable-body">Cómo optimizar tu futura web y perfiles para aparecer cuando alguien busque "Private Chef in Miami". Captura orgánica de demanda activa.</div>
            <span className="deliverable-tag">SEO &middot; Visibilidad</span>
          </div>
          <div className="deliverable-item reveal reveal-delay-3">
            <div className="deliverable-number">04</div>
            <div className="deliverable-title">Hoja de Ruta de Crecimiento</div>
            <div className="deliverable-body">Objetivos claros a corto, mediano y largo plazo. No tendencias — métricas accionables que reflejan el crecimiento real de tu negocio.</div>
            <span className="deliverable-tag">Roadmap &middot; KPIs</span>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap">
        <div className="section-eyebrow reveal">03 &middot; Hoja de Ruta Propuesta</div>
        <h2 className="section-title reveal reveal-delay-1">El mapa,<br /><em>tú eliges</em><br />el equipo</h2>
        <p className="section-body reveal reveal-delay-2" style={{ marginBottom: '1.5rem' }}>
          Este Brief Estratégico te entrega una visión 360° de todas las acciones de marketing digital que tu marca necesita. Tú decides con quién y cuándo ejecutar cada frente — yo te entrego el criterio para elegir bien.
        </p>
        <p className="section-body reveal reveal-delay-2" style={{ fontSize: '14px', color: '#999', fontStyle: 'italic' }}>
          Nota: las fases a continuación son una proyección orientativa de implementación. La ejecución de cada etapa es tuya y de los equipos que elijas contratar.
        </p>
        <div className="roadmap-timeline" style={{ marginTop: '3rem' }}>
          <div className="roadmap-step active reveal">
            <div className="roadmap-period">Semana 1 &middot; Entregable de esta consultoría</div>
            <div className="roadmap-step-title">Brief Estratégico 360°</div>
            <div className="roadmap-step-body">Recibes el documento maestro completo: arquitectura de marca, plan de contenidos, estrategia SEO local para Miami, recomendaciones de automatización y hoja de ruta con KPIs claros.</div>
          </div>
          <div className="roadmap-step reveal reveal-delay-1">
            <div className="roadmap-period">Días 30–90 &middot; Implementación recomendada</div>
            <div className="roadmap-step-title">Activación y Primeros Resultados</div>
            <div className="roadmap-step-body">Con el brief en mano, puedes activar: producción audiovisual, SEO local, automatizaciones de DM/WhatsApp y sistemas de reserva. Tú decides con quién avanzar.</div>
          </div>
          <div className="roadmap-step reveal reveal-delay-2">
            <div className="roadmap-period">Meses 4–12 &middot; Escala sostenida</div>
            <div className="roadmap-step-title">Ecosistema Digital Operando</div>
            <div className="roadmap-step-body">Instagram, SEO, automatizaciones y contenido trabajando juntos para captar clientes de lujo de forma consistente — sin gestión manual de cada proceso.</div>
          </div>
        </div>
      </section>

      {/* AUTOMATIZACIÓN */}
      <div id="automatizacion">
        <div className="inner">
          <div className="section-eyebrow reveal">04 &middot; Lo que el Brief incluirá</div>
          <h2 className="section-title reveal reveal-delay-1">Recomendaciones<br />de <em>modernización</em></h2>
          <div className="divider"></div>
          <p style={{ fontSize: '14px', color: 'rgba(247,245,242,0.4)', marginBottom: 0, fontWeight: 300, maxWidth: '560px' }}>
            El Brief incluirá análisis y recomendaciones detalladas sobre estas tres áreas. La implementación es una decisión tuya.
          </p>
          <div className="auto-grid">
            <div className="auto-item reveal">
              <svg className="auto-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="28" height="20" rx="3" stroke="#C9A96E" strokeWidth="1" />
                <path d="M4 13l14 9 14-9" stroke="#C9A96E" strokeWidth="1" />
              </svg>
              <div className="auto-title">Automatización de Leads</div>
              <div className="auto-body">Flujos automáticos para Instagram DM y WhatsApp: cuando alguien pregunte por un menú, el sistema responde y agenda — sin intervención manual.</div>
            </div>
            <div className="auto-item reveal reveal-delay-1">
              <svg className="auto-icon" viewBox="0 0 36 36" fill="none">
                <rect x="5" y="5" width="26" height="26" rx="3" stroke="#C9A96E" strokeWidth="1" />
                <path d="M12 18h12M18 12v12" stroke="#C9A96E" strokeWidth="1" />
              </svg>
              <div className="auto-title">Sistema de Reservas</div>
              <div className="auto-body">Recomendación de herramientas para gestión de depósitos y fechas, con opciones según tu presupuesto y volumen de eventos.</div>
            </div>
            <div className="auto-item reveal reveal-delay-2">
              <svg className="auto-icon" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="13" stroke="#C9A96E" strokeWidth="1" />
                <path d="M13 18l4 4 7-7" stroke="#C9A96E" strokeWidth="1" />
              </svg>
              <div className="auto-title">IA en Contenido</div>
              <div className="auto-body">Herramientas de IA para guiones, voz y limpieza de audio. El Brief especificará qué usar, para qué formato y cómo integrarlo a tu equipo audiovisual.</div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-eyebrow reveal">05 &middot; Inversión</div>
        <h2 className="section-title reveal reveal-delay-1">Transparencia<br />total de <em>costos</em></h2>
        <div className="pricing-wrapper">
          <div className="price-card reveal">
            <div className="price-label">Consultoría Estratégica</div>
            <div className="price-amount"><span className="price-currency">$</span>850</div>
            <div className="price-type">USD &middot; Pago único</div>
            <div className="price-includes">
              <div className="price-includes-title">Incluye</div>
              <ul>
                <li>Brief Estratégico completo</li>
                <li>Arquitectura de Marca</li>
                <li>Plan Maestro de Contenidos</li>
                <li>Estrategia SEO Local Miami</li>
                <li>Hoja de Ruta 30/90/365 días</li>
                <li>Recomendaciones de automatización</li>
              </ul>
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="production-table">
              <div className="production-header">
                <div className="production-header-title">Ejecución Audiovisual &middot; Precios Referenciales 2026</div>
              </div>
              <div className="production-row">
                <div>
                  <div className="production-row-name">Paquete Solo Edición (4 videos)</div>
                  <div className="production-row-detail">Hasta 1 min &middot; 2 rondas de corrección por video</div>
                </div>
                <div className="production-price">$230.000</div>
              </div>
              <div className="production-row">
                <div>
                  <div className="production-row-name">Edición Video Orgánico</div>
                  <div className="production-row-detail">15–45s &middot; Música, subtítulos y transiciones</div>
                </div>
                <div className="production-price">$60.000</div>
              </div>
              <div className="production-row">
                <div>
                  <div className="production-row-name">Video Enfoque Venta</div>
                  <div className="production-row-detail">Hasta 1 min &middot; Texto estratégico y storytelling</div>
                </div>
                <div className="production-price">$85.000</div>
              </div>
              <div className="production-row">
                <div>
                  <div className="production-row-name">Guion y Voz con IA</div>
                  <div className="production-row-detail">Guion profesional + voz para pauta</div>
                </div>
                <div className="production-price">$20.000</div>
              </div>
              <div className="production-note">
                Precios en COP. Material en alta calidad suministrado por el cliente. Cambios en las primeras 24h; correcciones adicionales desde $18.000.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ YO */}
      <div id="porque">
        <div className="inner">
          <span className="quote-mark reveal">&ldquo;</span>
          <p className="quote-text reveal reveal-delay-1">
            Mi meta no es que tengas un Instagram bonito. Mi meta es que tengas un ecosistema digital que <em>facture</em>.
          </p>
          <div className="quote-attr reveal reveal-delay-2">Victor Hugo Estupiñán &middot; Publicista &middot; SEO & Conversión</div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div id="cta-final">
        <div className="inner">
          <div className="section-eyebrow reveal">¿Siguiente paso?</div>
          <h2 className="section-title reveal reveal-delay-1">Empecemos a <em>construir</em></h2>
          <p className="section-body reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            Te entrego el mapa del éxito. Tú decides quién te acompaña en el viaje.
          </p>
          
          <a
            href="https://wa.me/573005384997?text=Hola%20Victor%2C%20vi%20tu%20propuesta%20para%20Chef%20Loren%20Mon%20y%20me%20interesa%20agendar%20una%20llamada%20estrat%C3%A9gica."
            className="cta-btn reveal reveal-delay-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar llamada estratégica
          </a>
          <p className="cta-note reveal reveal-delay-4">Consultoría &middot; $850 USD &middot; Pago único</p>
        </div>
      </div>

      {/* CONDICIONES DE PAGO */}
      <div style={{ background: 'var(--off-white)', padding: '4rem 3rem', borderTop: '0.5px solid var(--gray-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }} className="reveal">
            Condiciones de Pago
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'var(--gray-border)', border: '1.5px solid var(--gray-border)' }} className="reveal reveal-delay-1">
            <div style={{ background: 'var(--off-white)', padding: '2rem 2.5rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem' }}>50%</div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--black)', marginBottom: '0.4rem' }}>Al confirmar la consultoría</div>
              <div style={{ fontSize: '13px', color: 'var(--gray-muted)', fontWeight: 300, lineHeight: 1.7 }}>
                Pago inicial para dar inicio formal al proceso estratégico. Equivale a <strong>$425 USD</strong>.
              </div>
            </div>
            <div style={{ background: 'var(--off-white)', padding: '2rem 2.5rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.5rem' }}>50%</div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--black)', marginBottom: '0.4rem' }}>A la entrega del Brief Estratégico</div>
              <div style={{ fontSize: '13px', color: 'var(--gray-muted)', fontWeight: 300, lineHeight: 1.7 }}>
                Pago final contra entrega en máximo <strong>1 semana</strong>. Equivale a <strong>$425 USD</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">Victor Hugo Estupiñán &middot; Estrategia Digital</div>
        <div className="footer-copy">Propuesta confidencial &middot; 2026</div>
      </footer>
    </>
  );
}

// Aislamiento total: sin header/footer/MUI/FloatingButton de pantom.net
PropuestaChefLorenMon.isolatedLayout = true;