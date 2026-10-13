import { Handshake, ShieldCheck, Clock, Award } from "lucide-react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const iconos = [Handshake, ShieldCheck, Clock, Award];

/** Tarjetas de valores corporativos. */
export default function Valores() {
  return (
    <section className="section bg-azul-claro">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Lo que nos define"
            title="Nuestros valores"
            center
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.valores.map((valor, i) => {
            const Icono = iconos[i % iconos.length];
            return (
              <li key={valor}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="card h-full text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-card bg-azul-corporativo text-white">
                      <Icono className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-heading font-bold text-azul-profundo">
                      {valor}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
