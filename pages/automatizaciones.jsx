import Link from "next/link";
import { useState } from "react";

export default function Automatizaciones() {
  return (
    <div className="min-h-screen bg-white text-[#333333]">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/pantom_logo.svg" alt="PANTOM" className="h-8 w-8" />
          <span className="font-bold tracking-wide">PANTOM</span>
        </div>
        <Link href="https://calendly.com/digitalstudiopantom/" target="_blank className="rounded-lg px-4 py-2 bg-[#ea5a19] text-white font-semibold">Agendar 15 min</Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Automatiza la calificación y agenda más reuniones, 24/7</h1>
          <p className="mt-4 text-lg text-neutral-700">Agentes de IA + flujos n8n para captar, calificar y agendar. En ~30 días nuestros clientes ven +30–50% más reuniones sin aumentar pauta.</p>
          <div className="mt-6 flex gap-3">
            <Link href="https://calendly.com/digitalstudiopantom/15min" className="rounded-lg px-5 py-3 bg-[#ea5a19] text-white font-semibold">Ver demo</Link>
            <a href="#contacto" className="rounded-lg px-5 py-3 border border-neutral-300 font-semibold">Solicitar propuesta</a>
          </div>
          <p className="mt-3 text-sm text-neutral-500">¿Quieres ver cómo luce un flujo real? Abajo te dejamos uno de ejemplo.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <img src="/automatizaciones_workflow.png" alt="Workflow n8n" className="w-full h-auto" />
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold">Cómo funciona</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Card title="1) Diagnóstico" desc="Entendemos tu funnel, herramientas y puntos de fricción."/>
          <Card title="2) Implementación" desc="Construimos el agente IA y los flujos n8n (email/WhatsApp/CRM)."/>
          <Card title="3) Medición & mejoras" desc="Medimos reuniones, respuestas y coste por lead para iterar."/>
        </div>
      </section>

      {/* Paquetes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-neutral-50">
        <h2 className="text-2xl font-bold">Paquetes</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Plan name="Starter" price="USD 1,500" bullets={[
            "1 flujo n8n (captación/calificación)",
            "Agente IA web básico",
            "Integración con Calendly",
          ]} />
          <Plan name="Pro" price="USD 3,500" featured bullets={[
            "3–5 flujos n8n (email, CRM, WhatsApp)",
            "Agente IA multi‑canal",
            "Dashboards & reportes",
          ]} />
          <Plan name="Enterprise" price="Desde USD 6,000" bullets={[
            "Flujos a medida + SSO",
            "Múltiples marcas / países",
            "SLA y soporte prioritario",
          ]} />
        </div>
      </section>

      {/* Formulario */}
      <section id="contacto" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold">Solicita una demo</h2>
        <LeadForm />
        <p className="mt-3 text-sm text-neutral-500">Al enviar aceptas ser contactado por PANTOM. No hacemos spam.</p>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} PANTOM · Automatizaciones & IA
      </footer>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-600">{desc}</p>
    </div>
  );
}

function Plan({ name, price, bullets, featured }) {
  return (
    <div className={`rounded-2xl p-6 border ${featured ? "border-[#ea5a19] shadow" : "border-neutral-200"}`}>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-2xl font-extrabold mt-2">{price}</p>
      <ul className="mt-4 space-y-2 text-neutral-700 list-disc pl-5">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <Link href="https://calendly.com/digitalstudiopantom/15min" className="mt-6 inline-block rounded-lg px-4 py-2 bg-[#ea5a19] text-white font-semibold">Agendar 15 min</Link>
    </div>
  );
}

function LeadForm() {
  const [status, setStatus] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    const data = { name: e.target.name.value, email: e.target.email.value, company: e.target.company.value, source: "landing_automatizaciones" };
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Network");
      setStatus("ok");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <input name="name" placeholder="Nombre" className="rounded-lg border border-neutral-300 px-4 py-3" required />
      <input name="email" type="email" placeholder="Email" className="rounded-lg border border-neutral-300 px-4 py-3" required />
      <input name="company" placeholder="Empresa" className="rounded-lg border border-neutral-300 px-4 py-3" />
      <button className="rounded-lg px-5 py-3 bg-[#ea5a19] text-white font-semibold" type="submit">Enviar</button>
      {status === "ok" && <p className="text-green-600">¡Gracias! Te contactaremos en breve.</p>}
      {status === "error" && <p className="text-red-600">Hubo un error. Inténtalo de nuevo.</p>}
    </form>
  );
}
