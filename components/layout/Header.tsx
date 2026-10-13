"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { company } from "@/data/company";
import { navItems } from "@/data/nav";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sobre el hero (solo en inicio) el header es transparente con texto blanco.
  const transparent = isHome && !scrolled;
  const linkBase = transparent ? "text-white/90" : "text-azul-profundo";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent"
            : "bg-white/90 shadow-soft backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4 py-3">
          {/* Marca */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${company.nombre} — Inicio`}
          >
            <Image
              src={
                transparent
                  ? "/logo-galeba-blanco.png"
                  : "/logo-galeba.png"
              }
              alt={company.nombre}
              width={305}
              height={187}
              priority
              unoptimized
              className="h-11 w-auto shrink-0 sm:h-14"
            />
          </Link>

          {/* Navegación de escritorio */}
          <nav aria-label="Principal" className="hidden lg:block">
            <ul
              className={`flex items-center gap-1 rounded-pill border px-2 py-1.5 transition-colors ${
                transparent ? "border-white/40" : "border-azul-medio/25"
              }`}
            >
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-pill px-4 py-2 text-sm transition-colors ${
                        active
                          ? "bg-azul-claro font-bold text-azul-corporativo"
                          : `${linkBase} font-medium ${
                              transparent ? "hover:bg-white/10" : "hover:bg-azul-claro"
                            }`
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link
              href="/contacto"
              className="btn btn-primary hidden sm:inline-flex"
            >
              Cotizar
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-field border lg:hidden ${
                transparent
                  ? "border-white/40 text-white"
                  : "border-gris-borde text-azul-corporativo"
              }`}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
