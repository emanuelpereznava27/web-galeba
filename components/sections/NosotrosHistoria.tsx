import Image from "next/image";
import { ShieldCheck, Radar, Route, Leaf } from "lucide-react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const puntos = [
  {
    Icono: ShieldCheck,
    texto: "Certificación OEA — Operador Económico Autorizado",
  },
  { Icono: Radar, texto: "Rastreo satelital GPS y monitoreo en tiempo real" },
  { Icono: Route, texto: "Rutas dedicadas y atención personalizada" },
  {
    Icono: Leaf,
    texto: `Permisos ambientales en ${company.permisosAmbientales.length} estados del país`,
  },
];

/** Presentación de la empresa con foto y datos destacados. */
export default function NosotrosHistoria() {
  const anios = new Date().getFullYear() - company.fundacion;

  return (
    <section className="section">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-azul-medio">
            Nuestra empresa
          </p>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.9rem)]">
            Un socio logístico para operaciones exigentes
          </h2>
          <p className="mt-5 text-lg">{company.presentacion}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {puntos.map(({ Icono, texto }) => (
              <li key={texto} className="flex items-start gap-2 text-sm">
                <Icono
                  className="mt-0.5 h-5 w-5 shrink-0 text-verde-check"
                  aria-hidden="true"
                />
                <span>{texto}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-card shadow-lg lg:aspect-[4/5]">
              <Image
                src="/img/nosotros-historia.jpg"
                alt="Flota de Logistics Galeba en operación"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-card bg-azul-corporativo px-6 py-4 text-white shadow-lg">
              <span className="block font-heading text-3xl font-extrabold">
                +{anios}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-azul-claro">
                Años de experiencia
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
