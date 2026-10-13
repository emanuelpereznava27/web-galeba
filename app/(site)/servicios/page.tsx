import type { Metadata } from "next";
import { CheckCircle2, Radar, UserCheck, Route } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Flota from "@/components/sections/Flota";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import CtaFinal from "@/components/sections/CtaFinal";
import { company } from "@/data/company";
import { infraTexto, serviciosNota } from "@/data/flota";

export const metadata: Metadata = {
  title: "Servicios e infraestructura | Flota y unidades",
  description:
    "Monitoreo satelital 24/7, atención personalizada y rutas dedicadas. Conoce nuestra flota: tractocamiones, tortons, camionetas 3.5 T, cajas secas 53', plataformas, lowboy y más.",
  alternates: { canonical: "/servicios" },
};

const iconos = [Radar, UserCheck, Route];

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Servicios e infraestructura"
        subtitle={infraTexto}
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <section className="section">
        <Container>
          <Reveal>
            <SectionTitle
              eyebrow="Nuestros servicios"
              title="Soluciones eficientes, seguras y puntuales"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {company.servicios.map((servicio, i) => {
              const Icono = iconos[i] ?? Radar;
              return (
                <Reveal key={servicio} delay={i * 80}>
                  <article className="card h-full">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-azul-corporativo/10 text-azul-corporativo">
                      <Icono className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 flex items-center gap-2 text-xl">
                      <CheckCircle2 className="h-5 w-5 text-verde-check" aria-hidden="true" />
                      {servicio}
                    </h3>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-gris-texto">{serviciosNota}</p>
        </Container>
      </section>

      <Flota />
      <CtaFinal />
    </>
  );
}
