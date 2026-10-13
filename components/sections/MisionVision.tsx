import { Target, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const mision =
  "Brindar un servicio de transporte de carga de excelencia, cumpliendo los más altos estándares de seguridad, garantía y puntualidad, actuando siempre con honestidad, justicia e integridad.";

const vision =
  "Ser una empresa de transporte de carga reconocida a nivel nacional, cubriendo las principales rutas de nuestro país, satisfaciendo las exigencias y expectativas de nuestros clientes potenciales.";

/** Misión y Visión en dos tarjetas sobre fondo azul claro. */
export default function MisionVision() {
  return (
    <section className="section bg-azul-claro">
      <Container className="grid gap-6 md:grid-cols-2">
        {[
          { titulo: "Misión", texto: mision, Icono: Target },
          { titulo: "Visión", texto: vision, Icono: Eye },
        ].map((item, i) => (
          <Reveal key={item.titulo} delay={i * 80}>
            <article className="card h-full p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-card bg-azul-corporativo text-white">
                <item.Icono className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)]">{item.titulo}</h2>
              <p className="mt-3 text-base">{item.texto}</p>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
