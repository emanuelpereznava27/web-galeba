"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const intro =
  "A lo largo de más de 28 años, Logistics Galeba ha evolucionado mediante el fortalecimiento de sus operaciones, el cumplimiento normativo y la implementación de estándares de seguridad, consolidándose como una empresa confiable en el transporte.";

/** Posiciones de cada hito sobre el "camino" (viewBox 1000x300). */
const nodos = [
  { x: 100, y: 170 },
  { x: 300, y: 90 },
  { x: 500, y: 170 },
  { x: 700, y: 90 },
  { x: 900, y: 170 },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Trayectoria" title="Nuestra historia" subtitle={intro} />
        </Reveal>

        {/* Escritorio: carretera SVG dibujada al scroll */}
        <div ref={ref} className="relative mt-14 hidden h-[320px] md:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Banda de carretera */}
            <path
              d="M100,170 C180,170 220,90 300,90 S420,170 500,170 S620,90 700,90 S820,170 900,170"
              fill="none"
              stroke="#0A2A66"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.12"
            />
            {/* Línea punteada blanca que se dibuja */}
            <path
              className={`road-path ${visible ? "is-visible" : ""}`}
              d="M100,170 C180,170 220,90 300,90 S420,170 500,170 S620,90 700,90 S820,170 900,170"
              fill="none"
              stroke="#2B7FE0"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ "--road-length": "1400" } as CSSProperties}
            />
          </svg>

          {company.historia.map((hito, i) => {
            const nodo = nodos[i] ?? nodos[nodos.length - 1];
            return (
              <div
                key={hito.anio}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{
                  left: `${(nodo.x / 1000) * 100}%`,
                  top: `${nodo.y}px`,
                  opacity: visible ? 1 : 0,
                  transform: `translate(-50%, -50%) translateY(${visible ? 0 : 16}px)`,
                  transition: `opacity .5s var(--ease-signature) ${i * 150 + 300}ms, transform .5s var(--ease-signature) ${i * 150 + 300}ms`,
                }}
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-azul-corporativo font-heading text-sm font-extrabold text-white shadow-soft">
                  {hito.anio}
                </span>
                <span className="mx-auto mt-3 block w-40 text-center text-sm font-semibold text-azul-profundo">
                  {hito.titulo}
                </span>
              </div>
            );
          })}
        </div>

        {/* Móvil: línea vertical */}
        <ol className="mt-10 space-y-8 border-l-2 border-dashed border-azul-medio/40 pl-6 md:hidden">
          {company.historia.map((hito) => (
            <li key={hito.anio} className="relative">
              <span className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full bg-azul-corporativo text-[0.6rem] font-bold text-white">
                {hito.anio}
              </span>
              <p className="font-heading font-bold text-azul-profundo">{hito.titulo}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
