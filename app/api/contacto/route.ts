import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  nombre: z.string().min(2).max(120),
  empresa: z.string().min(2).max(160),
  correo: z.string().email().max(160),
  telefono: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length === 10, "Teléfono inválido"),
  unidad: z.string().max(80).optional().default(""),
  origen: z.string().max(120).optional().default(""),
  destino: z.string().max(120).optional().default(""),
  tipoCarga: z.string().max(80).optional().default(""),
  mensaje: z.string().min(10).max(4000),
  privacidad: z.literal(true),
  // Honeypot: debe venir vacío. No se valida con max(0) para poder devolver
  // una respuesta de "éxito" falsa a los bots sin delatar la trampa.
  website: z.string().optional().default(""),
});

/* ── Rate limiting básico en memoria: máx. 5 envíos por IP por hora ── */
const hits = new Map<string, number[]>();
// TODO: temporal para diagnóstico, restablecer a 5.
const LIMITE = 100;
const VENTANA = 60 * 60 * 1000;

function excedeLimite(ip: string): boolean {
  const ahora = Date.now();
  const previos = (hits.get(ip) ?? []).filter((t) => ahora - t < VENTANA);
  if (previos.length >= LIMITE) return true;
  previos.push(ahora);
  hits.set(ip, previos);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconocida";

  if (excedeLimite(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
      { status: 429 }
    );
  }

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Revisa los datos del formulario." },
      { status: 400 }
    );
  }

  // Honeypot activado: descartar silenciosamente (parece éxito para el bot).
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const asunto = `Nueva solicitud web — ${data.empresa} (${
    data.unidad || "unidad por definir"
  })`;

  const cuerpo = [
    "Nueva solicitud de cotización desde el sitio web:",
    "",
    `Nombre:        ${data.nombre}`,
    `Empresa:       ${data.empresa}`,
    `Correo:        ${data.correo}`,
    `Teléfono:      ${data.telefono}`,
    `Unidad:        ${data.unidad || "—"}`,
    `Origen:        ${data.origen || "—"}`,
    `Destino:       ${data.destino || "—"}`,
    `Tipo de carga: ${data.tipoCarga || "—"}`,
    "",
    "Mensaje:",
    data.mensaje,
  ].join("\n");

  try {
    await enviarCorreo(asunto, cuerpo, data.correo);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contacto] Error al enviar correo:", error);
    return NextResponse.json(
      {
        error: "No pudimos enviar tu solicitud. Intenta por WhatsApp o correo.",
        // TODO: temporal para diagnóstico, quitar luego.
        detalle: String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * Envía el correo según `EMAIL_PROVIDER` (resend | smtp | log).
 * Proveedor por defecto: "log" (solo imprime en consola).
 */
async function enviarCorreo(asunto: string, cuerpo: string, replyTo: string) {
  const pass = process.env.SMTP_PASS;
  const resendKey = process.env.RESEND_API_KEY;
  // Una clave real de Resend empieza con "re_" (ignora textos de ejemplo).
  const resendValido = Boolean(resendKey && resendKey.startsWith("re_"));

  // Si hay contraseña SMTP se usa SMTP (Gmail/Workspace por defecto); si no,
  // Resend con una clave válida; si no, modo demo (log).
  const proveedor =
    process.env.EMAIL_PROVIDER === "log"
      ? "log"
      : pass
      ? "smtp"
      : resendValido
      ? "resend"
      : "log";

  const from =
    process.env.MAIL_FROM ||
    (proveedor === "resend"
      ? // Con Resend sin dominio verificado, el remitente debe ser el de prueba.
        "Sitio Web Galeba <onboarding@resend.dev>"
      : "Sitio Web Galeba <gerencia@galeba.com>");
  // Las cotizaciones del sitio llegan únicamente a gerencia.
  const destinatarios = [
    process.env.MAIL_TO_GERENCIA || "gerencia@galeba.com",
    // Copia opcional a operaciones, si se define en el entorno.
    process.env.MAIL_TO_OPERACIONES,
  ].filter(Boolean) as string[];

  if (proveedor === "resend" && resendValido) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: destinatarios,
        subject: asunto,
        text: cuerpo,
        reply_to: replyTo,
      }),
    });
    if (!res.ok) throw new Error(`Resend: ${await res.text()}`);
    return;
  }

  if (proveedor === "smtp") {
    const nodemailer = (await import("nodemailer")).default;
    // Por defecto Gmail (Google Workspace), que es el correo de Galeba.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER || "gerencia@galeba.com",
        pass: pass as string,
      },
    });
    await transporter.sendMail({
      from,
      to: destinatarios.join(", "),
      subject: asunto,
      text: cuerpo,
      replyTo,
    });
    return;
  }

  // Modo demo
  console.log(
    "[contacto] (modo log) Nueva solicitud:\n",
    asunto,
    "\n\n",
    cuerpo,
    "\n---"
  );
}
