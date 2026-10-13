"use client";

import { useEffect, useRef, useState } from "react";
import {
  Truck,
  Car,
  Construction,
  Package,
  Layers,
  Forklift,
  Container as ContainerIcon,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  flota,
  categorias,
  type CategoriaCargaId,
  type Unidad,
} from "@/data/flota";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const ICONOS: Record<string, LucideIcon> = {
  Truck,
  Car,
  Construction,
  Package,
  Layers,
  Forklift,
  Container: ContainerIcon,
};

export default function Flota() {
  const [categoria, setCategoria] = useState<CategoriaCargaId | "todas">("todas");
  const [abierta, setAbierta] = useState<Unidad | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const lista =
    categoria === "todas"
      ? flota
      : flota.filter((u) => u.categorias.includes(categoria));

  // Cierre con Escape + foco
  useEffect(() => {
    if (!abierta) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "Tab") {
        const f = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(
      () => modalRef.current?.querySelector<HTMLElement>("button")?.focus(),
      80
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [abierta]);

  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Flota e infraestructura"
            title="Tipos de unidad"
            subtitle="Selecciona el tipo de carga para ver las unidades recomendadas. Cada unidad se puede cotizar directamente."
          />
        </Reveal>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Filtrar por tipo de carga">
          {[{ id: "todas" as const, label: "Todas" }, ...categorias].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoria(cat.id as CategoriaCargaId | "todas")}
              aria-pressed={categoria === cat.id}
              className={`rounded-pill border px-4 py-2 text-sm font-semibold transition-colors ${
                categoria === cat.id
                  ? "border-azul-corporativo bg-azul-corporativo text-white"
                  : "border-gris-borde bg-white text-azul-corporativo hover:border-azul-medio"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((unidad, i) => {
            const Icono = ICONOS[unidad.icono] ?? Truck;
            return (
              <Reveal key={unidad.slug} delay={(i % 4) * 60}>
                <li id={unidad.slug} className="card h-full p-0">
                  {/* Placeholder de foto */}
                  <div className="flex h-36 items-center justify-center rounded-t-card bg-azul-claro text-azul-medio">
                    <Icono className="h-12 w-12" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg">{unidad.nombre}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gris-texto">
                      {unidad.descripcion}
                    </p>
                    <button
                      type="button"
                      onClick={() => setAbierta(unidad)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-azul-corporativo hover:underline"
                    >
                      Ver detalles
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      {/* Modal */}
      {abierta && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-azul-profundo/70 p-4"
          onClick={() => setAbierta(null)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="flota-modal-title"
            className="animate-fade-in relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAbierta(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-field border border-gris-borde text-azul-corporativo"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex h-28 items-center justify-center rounded-card bg-azul-claro text-azul-medio">
              {(() => {
                const Icono = ICONOS[abierta.icono] ?? Truck;
                return <Icono className="h-12 w-12" aria-hidden="true" />;
              })()}
            </div>

            <h3 id="flota-modal-title" className="mt-5 text-2xl">
              {abierta.nombre}
            </h3>
            <p className="mt-3 text-sm text-gris-texto">{abierta.descripcion}</p>

            <h4 className="mt-5 font-heading text-sm font-bold uppercase text-azul-profundo">
              Usos típicos
            </h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gris-texto">
              {abierta.usos.map((uso) => (
                <li key={uso}>{uso}</li>
              ))}
            </ul>

            {abierta.nota && (
              <p className="mt-4 rounded-field bg-azul-claro px-3 py-2 text-xs text-azul-profundo">
                {abierta.nota}
              </p>
            )}

            <div className="mt-6">
              <Button href={`/contacto?unidad=${abierta.slug}`} variant="primary" block>
                Cotizar este servicio
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
