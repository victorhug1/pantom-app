import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const ParticlesBackgroundServicios = dynamic(
	() => import('@/components/ParticlesBackgroundServicios'),
	{ ssr: false }
);

export default function Automatizaciones() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: "Automatizaciones y Workflows | Pantom",
		description: "Diseñamos e integramos automatizaciones de marketing, ventas y operaciones para escalar resultados con eficiencia.",
		brand: {
			"@type": "Brand",
			name: "Pantom Digital Studio"
		},
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
			url: "https://pantom.digital/automatizaciones"
		}
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "¿Qué procesos puedo automatizar?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Marketing (emails, segmentación), ventas (calificación, seguimiento), operaciones (reportes, sincronización de datos) e integraciones entre tus herramientas."
				}
			},
			{
				"@type": "Question",
				name: "¿Cuánto tiempo tarda una implementación?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Dependiendo del alcance, entre 1 y 3 semanas para un MVP funcional con iteraciones posteriores."
				}
			},
			{
				"@type": "Question",
				name: "¿Qué herramientas utilizan?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "n8n, Make, Zapier, integraciones nativas y conectores personalizados vía API según necesidades."
				}
			}
		]
	};

	return (
		<>
			<SEO
				title="Automatizaciones y Workflows | Pantom Digital Studio"
				description="Implementamos automatizaciones para marketing, ventas y operaciones que convierten y ahorran tiempo. Agenda una demo sin costo."
				ogImage="/og-automatizaciones.jpg"
				ogUrl="https://pantom.digital/automatizaciones"
				canonicalUrl="https://pantom.digital/automatizaciones"
				type="product"
				structuredData={structuredData}
			/>
			<Layout>
				<div className="relative min-h-screen bg-black text-white">
					<ParticlesBackgroundServicios />

					{/* Overlays para look & feel del home */}
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute inset-0 bg-background/80" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.12]" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.06]" />
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20" />
					</div>

					<main className="relative z-10">
						{/* HERO */}
						<section className="pt-28 pb-16">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
								<motion.h1
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
									className="text-4xl md:text-6xl font-bold leading-tight"
								>
									Automatiza tu crecimiento: menos tareas, más ventas
								</motion.h1>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.6 }}
									className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
								>
									Diseñamos sistemas que capturan leads, nutren, asignan y reportan en automático. Implementación ágil, medible y sin dolores.
								</motion.p>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.35, duration: 0.6 }}
									className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
								>
									<a
										href="https://calendly.com/digitalstudiopantom"
										className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-colors"
									>
										Agendar 15 min
									</a>
									<a
										href="#casos"
										className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 transition-colors"
									>
										Ver casos y flujos
									</a>
								</motion.div>

								{/* Placeholder Hero Image 1600x900 */}
								<div className="mt-12 mx-auto w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
									<span className="text-gray-400 text-sm">Imagen principal 1600x900 (PNG/JPG) – Showcase del flujo/stack</span>
								</div>
							</div>
						</section>

						{/* LOGOS / TRUST */}
						<section className="py-10">
							<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-80">
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
									{Array.from({ length: 5 }).map((_, i) => (
										<div key={i} className="h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
											<span className="text-[11px] text-gray-400">Logo cliente 200x80</span>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* BENEFICIOS */}
						<section className="py-20">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									{[
										{ t: 'Más velocidad comercial', d: 'Asignación automática, recordatorios y priorización de leads.' },
										{ t: 'Datos ordenados', d: 'Sincronización bidireccional entre CRM, forms y analítica.' },
										{ t: 'Menos errores', d: 'Flujos resilientes con reintentos y alertas.' }
									].map((b) => (
										<motion.div
											key={b.t}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: '-80px' }}
											transition={{ duration: 0.5 }}
											className="bg-white/5 border border-white/10 rounded-2xl p-6"
										>
											<h3 className="text-xl font-semibold mb-2">{b.t}</h3>
											<p className="text-gray-300">{b.d}</p>
										</motion.div>
									))}
								</div>
							</div>
						</section>

						{/* BLOQUE DEMO / MOCKUP */}
						<section id="casos" className="py-12">
							<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
									<div className="space-y-4">
										<h2 className="text-3xl font-bold">Cómo luce un flujo real</h2>
										<p className="text-gray-300">Ejemplo: lead entra por form → calificación → asignación → nutrido → pipeline → reporte.</p>
										<div className="flex gap-4">
											<a href="https://calendly.com/digitalstudiopantom" className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors">Ver demo en vivo</a>
											<a href="#faq" className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition-colors">Dudas frecuentes</a>
										</div>
									</div>
									<div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
										<span className="text-gray-400 text-sm">Mockup 1280x720 (PNG/JPG) – Diagrama/Workflow</span>
									</div>
								</div>
							</div>
						</section>

						{/* INTEGRACIONES */}
						<section className="py-20">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<h2 className="text-3xl font-bold text-center mb-10">Se integra con tu stack</h2>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
									{Array.from({ length: 12 }).map((_, i) => (
										<div key={i} className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
											<span className="text-[11px] text-gray-400">Logo 120x120</span>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* TESTIMONIOS */}
						<section className="py-20">
							<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{Array.from({ length: 2 }).map((_, i) => (
										<div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
											<p className="text-lg italic mb-4">“Resultado contundente en 90 días. Alineamos marketing y ventas con datos.”</p>
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
													<span className="text-[10px] text-gray-400">96x96</span>
												</div>
												<div>
													<strong>Nombre Apellido</strong>
													<div className="text-gray-400 text-sm">Cargo · Industria</div>
												</div>
												<div className="ml-auto w-16 h-8 bg-white/10 border border-white/10 rounded flex items-center justify-center">
													<span className="text-[10px] text-gray-400">120x60</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* FAQ */}
						<section id="faq" className="py-20">
							<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
								<h2 className="text-3xl font-bold text-center mb-10">Preguntas frecuentes</h2>
								<div className="space-y-4">
									{[
										{ q: '¿Qué procesos puedo automatizar?', a: 'Marketing, ventas y operaciones: emails, calificación, asignación, reportes y sincronización de datos.' },
										{ q: '¿Cuánto tarda?', a: 'Entre 1 y 3 semanas para un MVP funcional según alcance.' },
										{ q: '¿Qué herramientas usan?', a: 'n8n, Make, Zapier y conectores vía API personalizadas.' }
									].map((f) => (
										<details key={f.q} className="group bg-white/5 border border-white/10 rounded-xl p-6">
											<summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
											<p className="mt-2 text-gray-300">{f.a}</p>
										</details>
									))}
								</div>
							</div>
						</section>

						{/* CTA FINAL */}
						<section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.03]" />
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
							<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
								<h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">Listo para activar tus automatizaciones</h2>
								<p className="text-lg text-gray-300 mb-8 leading-relaxed">Agenda una sesión y diseñamos juntos tu primer flujo de alto impacto.</p>
								<a href="https://calendly.com/digitalstudiopantom" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
									Agendar 15 min
								</a>
							</div>
						</section>

						{/* Footer local con enlace de desuscripción solicitado */}
						<section className="py-6 border-t border-white/10 bg-black/60">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
								<a href="https://n8n.pantom.net/webhook/unsub?e={{$json.email}}&s={{$json.sourceSheet}}" className="hover:text-primary">Darse de baja de comunicaciones</a>
							</div>
						</section>
					</main>
				</div>

				{/* FAQ Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			</Layout>
		</>
	);
}