"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, ShieldCheck, Radar, CalendarCheck } from "lucide-react";
import { company } from "@/data/company";
import Button from "@/components/ui/Button";
import DotRail from "@/components/ui/DotRail";

/**
 * Hero de la home (100vh) con parallax suave en la imagen (máx. 40px,
 * desactivado en móvil).
 */
export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      if (reduce || window.innerWidth < 768) {
        setOffset(0);
        return;
      }
      setOffset(Math.min(window.scrollY * 0.2, 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset}px)` }}>
        <Image
          src="/img/hero-flota.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,42,102,.85), rgba(0,63,148,.55))",
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto grid gap-10 py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-azul-claro/90">
            {company.descripcionCorta}
          </p>
          <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] text-white">
            {company.nombreCorto}
          </h1>
          <p className="mt-4 max-w-xl text-xl text-azul-claro sm:text-2xl">
            {company.slogan}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contacto" variant="white">
              Solicitar cotización
            </Button>
            <Button href="/nosotros" variant="outline">
              Conoce nuestra historia
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            <li className="badge">
              <ShieldCheck className="h-4 w-4 text-verde-check" aria-hidden="true" />
              Certificación OEA
            </li>
            <li className="badge">
              <Radar className="h-4 w-4" aria-hidden="true" />
              Monitoreo satelital 24/7
            </li>
            <li className="badge">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              +{new Date().getFullYear() - company.fundacion} años de experiencia
            </li>
          </ul>
        </div>

        <div className="hidden justify-end lg:flex">
          <DotRail tone="blanco" />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">
        <span className="sr-only">Desplázate hacia abajo</span>
        <ChevronDown
          className="h-8 w-8 animate-bounce-down motion-reduce:animate-none"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
