import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { company, mailtoLink, waLink } from "@/data/company";
import { navItems } from "@/data/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-azul-profundo text-white">
      <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          <Image
            src="/logo-grupo-rocha.png"
            alt={company.nombre}
            width={500}
            height={500}
            unoptimized
            className="h-16 w-auto"
          />
          <p className="mt-4 text-sm text-azul-claro/85">{company.slogan}</p>
          <p className="mt-3 text-xs text-azul-claro/60">
            {company.nombre}
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie de página">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Navegación
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-azul-claro/85 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-azul-claro/85">
            <li>
              <a
                href={mailtoLink(company.contactos.gerencia.correo)}
                className="transition-colors hover:text-white"
              >
                {company.contactos.gerencia.correo}
              </a>
            </li>
            <li>
              <a
                href={waLink(
                  company.contactos.gerencia.whatsapp[0],
                  "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp {company.contactos.gerencia.whatsapp[0]}
              </a>
            </li>
            <li>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Ver ubicación
              </a>
            </li>
          </ul>
        </div>

        {/* Certificaciones */}
        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Certificaciones
          </h2>
          <div className="mt-4 flex items-center gap-3 rounded-card border border-white/15 bg-white/5 p-4">
            <ShieldCheck className="h-8 w-8 shrink-0 text-verde-check" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold">Operador Económico Autorizado</p>
              <p className="text-xs text-azul-claro/75">
                CAAT {company.caat.codigo} · {company.caat.perfil}
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/aviso-de-privacidad"
                className="text-azul-claro/85 transition-colors hover:text-white"
              >
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <a
                href={waLink(
                  company.contactos.gerencia.whatsapp[0],
                  "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-azul-claro/85 transition-colors hover:text-white"
              >
                WhatsApp gerencia
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-5 text-xs text-azul-claro/70 sm:flex-row">
          <span>
            © {year} {company.nombre}. Todos los derechos reservados.
          </span>
          <a
            href={`https://${company.web}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {company.web}
          </a>
        </div>
      </div>
    </footer>
  );
}
