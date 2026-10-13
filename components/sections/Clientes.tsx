"use client";

import { clientes, clientesEntreOtros } from "@/data/clientes";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

/**
 * Marquee infinito de clientes en escala de grises que recuperan color al
 * hover. La lista se duplica para lograr el bucle continuo.
 */
export default function Clientes() {
  const lista = [...clientes, ...clientes];

  return (
    <section className="section bg-azul-claro">
      <Container>
        <Reveal>
          <SectionTitle
            center
            eyebrow="Clientes"
            title="Empresas que confían en nosotros"
            subtitle={clientesEntreOtros}
          />
        </Reveal>
      </Container>

      <div className="marquee relative mt-12 overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-6">
          {lista.map((cliente, i) => (
            <li
              key={`${cliente.slug}-${i}`}
              className="flex h-24 w-56 shrink-0 items-center justify-center rounded-card border border-gris-borde bg-white px-6 shadow-soft grayscale transition-all duration-300 hover:grayscale-0"
            >
              {/* Si el logo no existe, se muestra el nombre en tipografía bold. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cliente.logo}
                alt={cliente.nombre}
                loading="lazy"
                className="max-h-12 w-auto max-w-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const span = target.nextElementSibling as HTMLElement | null;
                  if (span) span.style.display = "block";
                }}
              />
              <span
                className="hidden font-heading text-lg font-extrabold text-azul-profundo"
                aria-hidden="true"
              >
                {cliente.nombre}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Container className="mt-6">
        <p className="text-center text-xs text-gris-texto/70">
          Nombres de clientes mostrados con fines de referencia corporativa.
        </p>
      </Container>
    </section>
  );
}
