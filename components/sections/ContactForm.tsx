"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { flota, categorias } from "@/data/flota";
import { company, waLink } from "@/data/company";

const schema = z.object({
  nombre: z.string().min(2, "Escribe tu nombre completo"),
  empresa: z.string().min(2, "Escribe el nombre de tu empresa"),
  correo: z.string().email("Ingresa un correo válido"),
  telefono: z
    .string()
    .refine(
      (v) => v.replace(/\D/g, "").length === 10,
      "Ingresa un teléfono de 10 dígitos"
    ),
  unidad: z.string().optional(),
  origen: z.string().optional(),
  destino: z.string().optional(),
  tipoCarga: z.string().optional(),
  mensaje: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
  privacidad: z
    .boolean()
    .refine((v) => v === true, "Debes aceptar el aviso de privacidad"),
  // Honeypot anti-spam: debe quedar vacío.
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const tiposCarga = [...categorias.map((c) => c.label), "Otra"];

/** Arma el texto que se enviará por WhatsApp a partir de los campos capturados. */
function componerMensaje(v: Partial<FormData>): string {
  const unidadNombre = v.unidad
    ? flota.find((u) => u.slug === v.unidad)?.nombre ?? v.unidad
    : "";

  return [
    "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba.",
    "",
    v.nombre ? `Nombre: ${v.nombre}` : "",
    v.empresa ? `Empresa: ${v.empresa}` : "",
    v.correo ? `Correo: ${v.correo}` : "",
    v.telefono ? `Teléfono: ${v.telefono}` : "",
    unidadNombre ? `Unidad: ${unidadNombre}` : "",
    v.tipoCarga ? `Tipo de carga: ${v.tipoCarga}` : "",
    v.origen ? `Origen: ${v.origen}` : "",
    v.destino ? `Destino: ${v.destino}` : "",
    v.mensaje ? `Mensaje: ${v.mensaje}` : "",
  ]
    .filter((linea) => linea !== "")
    .join("\n");
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const unidadParam = searchParams.get("unidad") || "";
  const unidadExiste = flota.some((u) => u.slug === unidadParam);

  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [mensajeEstado, setMensajeEstado] = useState("");
  const [resumen, setResumen] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      unidad: unidadExiste ? unidadParam : "",
      origen: "",
      destino: "",
      tipoCarga: "",
      mensaje: "",
      privacidad: false,
      website: "",
    },
  });

  // El enlace de WhatsApp se actualiza en vivo con lo que el usuario escribe.
  const valores = watch();
  const waHref = waLink(company.cotizaciones.whatsapp, componerMensaje(valores));

  const onSubmit = async (data: FormData) => {
    setEstado("loading");
    setMensajeEstado("");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEstado("error");
        setMensajeEstado(
          json?.error || "No pudimos enviar tu solicitud. Intenta de nuevo."
        );
        return;
      }

      setEstado("ok");
      setMensajeEstado(
        `¡Gracias! Tu solicitud fue enviada a ${company.cotizaciones.correo}. Te contactaremos pronto.`
      );
      setResumen(componerMensaje(data));
      reset({
        ...data,
        nombre: "",
        empresa: "",
        correo: "",
        telefono: "",
        origen: "",
        destino: "",
        tipoCarga: "",
        mensaje: "",
        privacidad: false,
        website: "",
      });
    } catch {
      setEstado("error");
      setMensajeEstado("Error de conexión. Revisa tu internet e intenta de nuevo.");
    }
  };

  const err = (name: keyof FormData) =>
    errors[name] ? (
      <p role="alert" className="mt-1 text-xs font-medium text-acento-rojo">
        {String(errors[name]?.message)}
      </p>
    ) : null;

  if (estado === "ok") {
    return (
      <div className="rounded-card border border-verde-check/40 bg-verde-check/5 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-7 w-7 text-verde-check" aria-hidden="true" />
          <h3 className="text-xl text-azul-profundo">Solicitud enviada</h3>
        </div>
        <p className="mt-3 text-sm text-gris-texto">{mensajeEstado}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={waLink(company.cotizaciones.whatsapp, resumen)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-verde-check text-white hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Reenviar por WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setEstado("idle")}
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">No llenar</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="nombre">
            Nombre completo *
          </label>
          <input
            id="nombre"
            className={`input ${errors.nombre ? "input-error" : ""}`}
            aria-invalid={!!errors.nombre}
            {...register("nombre")}
          />
          {err("nombre")}
        </div>
        <div>
          <label className="label" htmlFor="empresa">
            Empresa *
          </label>
          <input
            id="empresa"
            className={`input ${errors.empresa ? "input-error" : ""}`}
            aria-invalid={!!errors.empresa}
            {...register("empresa")}
          />
          {err("empresa")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="correo">
            Correo *
          </label>
          <input
            id="correo"
            type="email"
            className={`input ${errors.correo ? "input-error" : ""}`}
            aria-invalid={!!errors.correo}
            {...register("correo")}
          />
          {err("correo")}
        </div>
        <div>
          <label className="label" htmlFor="telefono">
            Teléfono (10 dígitos) *
          </label>
          <input
            id="telefono"
            type="tel"
            inputMode="numeric"
            placeholder="722 000 0000"
            className={`input ${errors.telefono ? "input-error" : ""}`}
            aria-invalid={!!errors.telefono}
            {...register("telefono")}
          />
          {err("telefono")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="unidad">
            Tipo de unidad requerida
          </label>
          <select id="unidad" className="input" {...register("unidad")}>
            <option value="">No lo sé todavía</option>
            {flota.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tipoCarga">
            Tipo de carga
          </label>
          <select id="tipoCarga" className="input" {...register("tipoCarga")}>
            <option value="">Selecciona…</option>
            {tiposCarga.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="origen">
            Origen
          </label>
          <input
            id="origen"
            className="input"
            placeholder="Ciudad / planta"
            {...register("origen")}
          />
        </div>
        <div>
          <label className="label" htmlFor="destino">
            Destino
          </label>
          <input
            id="destino"
            className="input"
            placeholder="Ciudad / planta"
            {...register("destino")}
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="mensaje">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          rows={4}
          className={`input ${errors.mensaje ? "input-error" : ""}`}
          aria-invalid={!!errors.mensaje}
          placeholder="Ej. 3 tarimas de autopartes, 2 ton, caja seca. Fecha estimada: …"
          {...register("mensaje")}
        />
        {err("mensaje")}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-gris-texto">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            aria-invalid={!!errors.privacidad}
            {...register("privacidad")}
          />
          <span>
            Acepto el{" "}
            <a
              href="/aviso-de-privacidad"
              className="font-semibold text-azul-corporativo underline"
            >
              aviso de privacidad
            </a>{" "}
            *
          </span>
        </label>
        {err("privacidad")}
      </div>

      {/* Dos formas de enviar la cotización */}
      <div className="rounded-card border border-gris-borde bg-azul-claro/60 p-4">
        <p className="text-sm font-semibold text-azul-profundo">
          Elige cómo enviar tu solicitud:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={estado === "loading"}
            className="btn btn-primary w-full disabled:opacity-70"
          >
            {estado === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Enviar por correo
              </>
            )}
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full bg-verde-check text-white hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Enviar por WhatsApp
          </a>
        </div>
        <p className="mt-3 text-xs text-gris-texto/80">
          Por correo a{" "}
          <strong className="text-azul-profundo">{company.cotizaciones.correo}</strong> o
          por WhatsApp al{" "}
          <strong className="text-azul-profundo">
            {company.cotizaciones.whatsapp}
          </strong>
          . El botón de WhatsApp abre la app con todos tus datos ya escritos.
        </p>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem] text-sm">
        {estado === "error" && (
          <p className="flex items-center gap-2 text-acento-rojo">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            {mensajeEstado}
          </p>
        )}
      </div>
    </form>
  );
}
