"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { company, waLink } from "@/data/company";

const MENSAJE =
  "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba";

/**
 * Botón flotante de WhatsApp (siempre visible) + botón "subir"
 * que aparece tras 600px de scroll.
 */
export default function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="animate-fade-in inline-flex h-11 w-11 items-center justify-center rounded-full border border-gris-borde bg-white text-azul-corporativo shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      <a
        href={waLink(company.contactos.gerencia.whatsapp[0], MENSAJE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cotizar por WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-verde-check text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
