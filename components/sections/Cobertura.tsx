"use client";

import { useState } from "react";
import {
  permisoIntro,
  puntosCobertura,
  coberturaNota,
} from "@/data/cobertura";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

/**
 * Mapa SVG estilizado de México con 5 puntos pulsantes.
 * Hover/tap en un punto resalta su etiqueta y viceversa.
 */
export default function Cobertura() {
  const [activo, setActivo] = useState<string | null>(null);

  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Cobertura"
            title={permisoIntro}
            subtitle="Estados donde contamos con permisos ambientales vigentes para nuestra operación."
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Mapa */}
          <Reveal>
            <div className="relative mx-auto aspect-[3/2] w-full max-w-[640px]">
              <svg
                viewBox="0 0 600 400"
                className="h-full w-full"
                role="img"
                aria-label="Mapa estilizado de México con los estados donde hay permisos ambientales"
              >
                <path
                  d="M70,150 C50,110 95,80 140,86 C175,55 235,60 290,58 C345,55 405,72 450,96 C480,112 462,140 432,150 C462,168 430,196 400,192 C424,214 388,238 356,232 C372,262 318,300 278,292 C252,326 205,320 190,292 C160,278 132,272 112,246 C82,232 60,206 78,182 C58,172 58,162 70,150 Z"
                  fill="#E8F0FB"
                  stroke="#2B7FE0"
                  strokeWidth="2.5"
                />
              </svg>

              {puntosCobertura.map((punto) => {
                const isActivo = activo === punto.estado;
                return (
                  <button
                    key={punto.estado}
                    type="button"
                    onMouseEnter={() => setActivo(punto.estado)}
                    onMouseLeave={() => setActivo(null)}
                    onFocus={() => setActivo(punto.estado)}
                    onBlur={() => setActivo(null)}
                    onClick={() =>
                      setActivo((prev) => (prev === punto.estado ? null : punto.estado))
                    }
                    aria-label={`${punto.estado} — permiso ambiental`}
                    aria-pressed={isActivo}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full bg-verde-check opacity-70 animate-pulse-dot motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-verde-check ring-2 ring-white" />
                    </span>
                    <span
                      className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-pill bg-azul-corporativo px-3 py-1 text-xs font-semibold text-white shadow-soft transition-opacity ${
                        isActivo ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {punto.estado}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Chips (siempre visibles; clave en móvil) */}
          <Reveal delay={80}>
            <ul className="flex flex-wrap gap-3">
              {puntosCobertura.map((punto) => (
                <li key={punto.estado}>
                  <button
                    type="button"
                    onMouseEnter={() => setActivo(punto.estado)}
                    onMouseLeave={() => setActivo(null)}
                    onFocus={() => setActivo(punto.estado)}
                    onBlur={() => setActivo(null)}
                    className={`pill ${
                      activo === punto.estado
                        ? "border-azul-corporativo bg-azul-corporativo text-white"
                        : ""
                    }`}
                  >
                    {punto.estado}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-gris-texto">{coberturaNota}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
