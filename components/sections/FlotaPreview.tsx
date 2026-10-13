import Link from "next/link";
import { Truck, ArrowRight } from "lucide-react";
import { company } from "@/data/company";
import { flota } from "@/data/flota";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

/** Vista previa de flota: chips de los tipos de unidad. */
export default function FlotaPreview() {
  return (
    <section className="section">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Infraestructura"
            title="Nuestra flota"
            subtitle="Equipo especializado para cada tipo de carga."
          />
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 font-semibold text-azul-corporativo hover:underline"
          >
            Ver detalle de unidades
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {flota.map((unidad, i) => (
            <Reveal key={unidad.slug} delay={i * 50}>
              <Link
                href={`/servicios#${unidad.slug}`}
                className="pill inline-flex items-center gap-2"
              >
                <Truck className="h-4 w-4 text-azul-medio" aria-hidden="true" />
                {unidad.nombre}
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-gris-texto/70">
          Total de {company.flota.length} tipos de unidad disponibles.
        </p>
      </Container>
    </section>
  );
}
