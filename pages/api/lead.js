export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  try {
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://n8n.pantom.net/webhook/1494646c-2f2e-412a-a2f9-6eaa04476d99";
    const r = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });
    const text = await r.text();
    // pase lo que pase, devolvemos 200 al browser para UX rápida
    return res.status(200).json({ ok: true, forwarded: r.status, body: text });
  } catch (e) {
    return res.status(200).json({ ok: true, forwarded: 0 });
  }
}
