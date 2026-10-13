import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

export type Migaja = { label: string; href?: string };

/**
 * Encabezado de páginas internas con migas de pan. Compensa el header fijo.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  breadcrumb: Migaja[];
}) {
  return (
    <section className="bg-azul-claro pb-12 pt-32">
      <div className="container mx-auto">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gris-texto">
            {breadcrumb.map((m, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <li key={`${m.label}-${i}`} className="flex items-center gap-1">
                  {m.href && !last ? (
                    <Link
                      href={m.href}
                      className="font-medium text-azul-corporativo hover:underline"
                    >
                      {m.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className="text-gris-texto/80">
                      {m.label}
                    </span>
                  )}
                  {!last && (
                    <ChevronRight className="h-4 w-4 text-gris-texto/50" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-azul-medio">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-3xl text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
