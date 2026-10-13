import { ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { oeaIntro } from "@/data/oea";

/** Banda de certificación OEA sobre fondo azul profundo. */
export default function OeaBand() {
  return (
    <section className="bg-azul-profundo py-16 text-white">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="flex items-start gap-5">
          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-card bg-white/10">
            <ShieldCheck className="h-9 w-9 text-verde-check" aria-hidden="true" />
          </span>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-azul-claro/90">
              Operador Económico Autorizado
            </p>
            <h2 className="mt-2 text-white">Certificación OEA México</h2>
            <p className="mt-3 text-azul-claro/85">{oeaIntro}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Button href="/certificaciones" variant="white">
            Ver certificaciones
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
