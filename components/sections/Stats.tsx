"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";

type Item = {
  valor?: number;
  texto?: string;
  sufijo?: string;
  etiqueta: string;
};

const items: Item[] = [
  { valor: new Date().getFullYear() - company.fundacion, sufijo: "+", etiqueta: "Años de experiencia (desde 1998)" },
  { texto: "24/7", etiqueta: "Monitoreo satelital" },
  { valor: 11, etiqueta: "Estándares de seguridad OEA" },
  { valor: 5, etiqueta: "Estados con permisos ambientales" },
];

function Contador({ valor, sufijo }: { valor: number; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          if (reduce) {
            setN(valor);
            return;
          }
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * valor));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [valor]);

  return (
    <span ref={ref} className="block font-heading text-4xl font-extrabold text-azul-corporativo sm:text-5xl">
      {n}
      {sufijo}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 -mt-16">
      <div className="container mx-auto">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-gris-borde bg-gris-borde shadow-lg lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.etiqueta} className="bg-white px-5 py-8 text-center">
              {item.texto ? (
                <span className="block font-heading text-4xl font-extrabold text-azul-corporativo sm:text-5xl">
                  {item.texto}
                </span>
              ) : (
                <Contador valor={item.valor as number} sufijo={item.sufijo} />
              )}
              <span className="mt-2 block text-sm font-semibold text-gris-texto">
                {item.etiqueta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
