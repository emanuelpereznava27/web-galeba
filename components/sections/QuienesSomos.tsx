import { CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const textoPresentacion =
  "Logistics Galeba, S.A. de C.V. es una empresa mexicana especializada en soluciones de transporte de carga terrestre y logística, con cumplimiento normativo. Fundada en 1998, cuenta con más de 28 años de experiencia brindando soluciones confiables a diversos sectores industriales. Nuestra operación se distingue por el uso de tecnología de rastreo GPS y personal altamente capacitado.";

/** Resumen de "Quiénes somos" para la home: texto y credenciales. */
export default function QuienesSomos() {
  return (
    <section className="section">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-azul-medio">
            Quiénes somos
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)]">
            Comprometidos con mover tu éxito
          </h2>
          <p className="mt-4">{textoPresentacion}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {company.servicios.map((servicio) => (
              <li key={servicio} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-verde-check" aria-hidden="true" />
                {servicio}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/nosotros" variant="line">
              Conocer más
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
