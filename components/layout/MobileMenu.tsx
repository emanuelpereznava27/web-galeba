"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { company, waLink } from "@/data/company";
import { navItems } from "@/data/nav";

/**
 * Panel lateral a pantalla completa para móvil.
 * Cierra con Escape, bloquea el scroll del body y atrapa el foco.
 */
export default function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // Trampa de foco simple
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 120);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          ref={panelRef}
          className="fixed inset-0 z-[60] flex flex-col bg-azul-profundo p-6 text-white lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-heading text-lg font-extrabold">
              {company.nombreCorto}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="inline-flex h-11 w-11 items-center justify-center rounded-field border border-white/30"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Principal móvil" className="mt-10 flex-1">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-card px-4 py-3 font-heading text-2xl font-bold uppercase transition-colors ${
                        active ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/15 pt-6">
            <Link
              href="/contacto"
              onClick={onClose}
              className="btn btn-white w-full"
            >
              Solicitar cotización
            </Link>
            <a
              href={waLink(
                company.contactos.gerencia.whatsapp[0],
                "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-sm text-azul-claro/80"
            >
              WhatsApp {company.contactos.gerencia.whatsapp[0]}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
