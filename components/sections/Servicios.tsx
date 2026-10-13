import { CheckCircle2, Radar, UserCheck, Route } from "lucide-react";
import { company } from "@/data/company";
import { serviciosNota } from "@/data/flota";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const iconos = [Radar, UserCheck, Route];

/** Tarjetas de servicios destacados con palomita verde. */
export default function Servicios() {
  return (
    <section className="section bg-azul-claro">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Servicios"
            title="Soluciones logísticas a tu medida"
            subtitle="Servicios diseñados para operaciones industriales que exigen seguridad, control y puntualidad."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {company.servicios.map((servicio, i) => {
            const Icono = iconos[i] ?? Radar;
            return (
              <Reveal key={servicio} delay={i * 80}>
                <article className="card h-full">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-azul-corporativo/10 text-azul-corporativo">
                      <Icono className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <CheckCircle2 className="h-6 w-6 text-verde-check" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl">{servicio}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-gris-texto">{serviciosNota}</p>

        <div className="mt-8">
          <Button href="/servicios" variant="primary">
            Ver todos los servicios
          </Button>
        </div>
      </Container>
    </section>
  );
}
