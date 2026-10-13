import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, MapPin, Building2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { company, mailtoLink, waLink } from "@/data/company";

export const metadata: Metadata = {
  title: "Contacto | Solicita tu cotización",
  description:
    "Contacta a Logistics Galeba para cotizar transporte de carga. Envía tu solicitud por correo o por WhatsApp.",
  alternates: { canonical: "/contacto" },
};

const MENSAJE_WA =
  "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba";

const departamentos = [
  {
    nombre: "Gerencia y cotizaciones",
    Icono: Building2,
    correo: company.contactos.gerencia.correo,
    whatsapp: company.contactos.gerencia.whatsapp,
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu operación"
        subtitle="Envíanos tu solicitud de cotización por correo o por WhatsApp, como prefieras."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-2">
          {/* Columna izquierda: departamentos */}
          <div className="space-y-6">
            {departamentos.map((dep, i) => (
              <Reveal key={dep.nombre} delay={i * 70}>
                <article className="card">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-azul-corporativo/10 text-azul-corporativo">
                      <dep.Icono className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className="text-xl">{dep.nombre}</h2>
                  </div>

                  {dep.correo && (
                    <p className="mt-4 flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-azul-medio" aria-hidden="true" />
                      <a
                        href={mailtoLink(dep.correo)}
                        className="font-medium text-azul-corporativo hover:underline"
                      >
                        {dep.correo}
                      </a>
                    </p>
                  )}

                  {dep.whatsapp.map((num) => (
                    <p key={num} className="mt-2 flex items-center gap-2 text-sm">
                      <MessageCircle className="h-4 w-4 text-verde-check" aria-hidden="true" />
                      <a
                        href={waLink(num, MENSAJE_WA)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-azul-corporativo hover:underline"
                      >
                        WhatsApp {num}
                      </a>
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}

            <Reveal delay={220}>
              <div className="rounded-card border border-gris-borde bg-azul-claro p-6">
                <p className="flex items-center gap-2 font-heading font-bold uppercase text-azul-profundo">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  Ubicación
                </p>
                <p className="mt-2 text-sm text-gris-texto">
                  {company.nombre} · Estado de México
                </p>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-4"
                >
                  Ver ubicación en Google Maps
                </a>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha: formulario */}
          <Reveal delay={80}>
            <div className="rounded-card border border-gris-borde bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-2xl">Solicita tu cotización</h2>
              <p className="mt-2 text-sm text-gris-texto">
                Los campos con * son obligatorios. Puedes enviarla por correo o
                por WhatsApp.
              </p>
              <div className="mt-6">
                <Suspense
                  fallback={
                    <p className="text-sm text-gris-texto">Cargando formulario…</p>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
