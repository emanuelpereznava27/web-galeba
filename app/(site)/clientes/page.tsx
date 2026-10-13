import type { Metadata } from "next";
import { Quote } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Clientes from "@/components/sections/Clientes";
import Cobertura from "@/components/sections/Cobertura";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { sectores, testimonial } from "@/data/clientes";

export const metadata: Metadata = {
  title: "Clientes y cobertura | Permisos ambientales",
  description:
    "Empresas que confían en Logistics Galeba y los estados donde contamos con permisos ambientales: Chihuahua, Saltillo, San Luis Potosí, Querétaro y Estado de México.",
  alternates: { canonical: "/clientes" },
};

export default function ClientesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Confianza"
        title="Clientes y cobertura"
        subtitle="Atendemos a industrias líderes y operamos con permisos ambientales en 5 estados."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Clientes" }]}
      />

      <Clientes />

      <section className="section">
        <Container>
          <Reveal>
            <SectionTitle
              eyebrow="Sectores"
              title="Industrias que atendemos"
              subtitle="Experiencia en operaciones que exigen seguridad, control y puntualidad."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectores.map((sector, i) => (
              <Reveal key={sector.titulo} delay={i * 70}>
                <article className="card h-full">
                  <h3 className="text-lg">{sector.titulo}</h3>
                  <p className="mt-2 text-sm text-gris-texto">{sector.descripcion}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <figure className="mx-auto max-w-3xl rounded-card border border-gris-borde bg-azul-claro p-8 text-center">
              <Quote className="mx-auto h-8 w-8 text-azul-medio" aria-hidden="true" />
              <blockquote className="mt-4 text-lg text-azul-profundo">
                {testimonial.texto}
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-gris-texto">
                {testimonial.autor} · {testimonial.cargo}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      <Cobertura />
    </>
  );
}
