import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Encabezado visual de la página "Nosotros": foto de fondo a sangre con
 * degradado azul y migas de pan para que combine con el hero de la home.
 */
export default function NosotrosHero() {
  return (
    <section className="relative flex min-h-[64vh] items-end overflow-hidden pb-16 pt-36">
      <Image
        src="/img/nosotros-hero.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,42,102,.72) 0%, rgba(10,42,102,.55) 38%, rgba(10,42,102,.92) 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-azul-claro/90">
            <li className="flex items-center gap-1">
              <Link href="/" className="font-medium hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4 text-white/50" aria-hidden="true" />
            </li>
            <li aria-current="page" className="text-azul-claro/80">
              Nosotros
            </li>
          </ol>
        </nav>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-azul-claro/90">
          Sobre nosotros
        </p>
        <h1 className="mt-2 text-[clamp(2.2rem,6vw,4rem)] text-white">
          Quiénes somos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-azul-claro">
          Transporte de carga y logística para la industria mexicana desde
          Toluca, Estado de México.
        </p>
      </Container>
    </section>
  );
}
