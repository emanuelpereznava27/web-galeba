"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown, Award } from "lucide-react";
import { oeaIntro, estandares } from "@/data/oea";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function OEA() {
  const [abierto, setAbierto] = useState<number | null>(1);

  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Certificación"
            title="Operador Económico Autorizado"
            subtitle={oeaIntro}
          />
        </Reveal>

        {/* Acordeón de estándares */}
        <div className="mt-14 space-y-3">
          {estandares.map((est) => {
            const isOpen = abierto === est.id;
            return (
              <Reveal key={est.id} delay={0}>
                <div
                  id={`estandar-${est.id}`}
                  className="overflow-hidden rounded-card border border-gris-borde bg-white"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${est.id}`}
                      onClick={() => setAbierto(isOpen ? null : est.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="flex items-center gap-3 font-heading text-base font-bold uppercase text-azul-profundo">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-azul-corporativo text-sm text-white">
                          {est.id}
                        </span>
                        {est.titulo}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-azul-medio transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`panel-${est.id}`}
                    hidden={!isOpen}
                    className="grid gap-6 border-t border-gris-borde px-5 py-5 md:grid-cols-[1.2fr_1fr]"
                  >
                    <ul className="space-y-2 text-sm text-gris-texto">
                      {est.puntos.map((punto) => (
                        <li key={punto} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azul-medio" aria-hidden="true" />
                          {punto}
                        </li>
                      ))}
                    </ul>
                    {/* Espacio para imagen de evidencia (placeholder) */}
                    <div className="flex min-h-[140px] flex-col items-center justify-center rounded-card border border-dashed border-gris-borde bg-azul-claro/60 p-4 text-center">
                      <Award className="h-8 w-8 text-azul-medio" aria-hidden="true" />
                      <p className="mt-2 text-xs text-gris-texto/80">
                        Imagen ilustrativa próximamente.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Ficha CAAT tipo credencial */}
        <Reveal className="mt-14">
          <div className="mx-auto max-w-xl">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-azul-medio">
              Registro CAAT
            </p>
            <div className="overflow-hidden rounded-card border border-gris-borde bg-gradient-to-br from-azul-profundo to-azul-corporativo p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-10 w-10 text-verde-check" aria-hidden="true" />
                  <span className="font-heading text-lg font-bold uppercase">
                    Código CAAT
                  </span>
                </div>
                <span className="rounded-pill bg-white/15 px-4 py-1 font-heading text-2xl font-extrabold tracking-wide">
                  {company.caat.codigo}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-azul-claro/70">Tipo de perfil</dt>
                  <dd className="font-semibold">{company.caat.perfil}</dd>
                </div>
                <div>
                  <dt className="text-azul-claro/70">Vigencia</dt>
                  <dd className="font-semibold">
                    {company.caat.inicio} a {company.caat.fin}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
