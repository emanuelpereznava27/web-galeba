import Image from "next/image";
import { ShieldCheck, FileBadge, Leaf } from "lucide-react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const certificaciones = [
  {
    Icono: ShieldCheck,
    titulo: "Certificación OEA",
    texto:
      "Operador Económico Autorizado: seguridad y cumplimiento reconocidos por la autoridad aduanera en la cadena de suministro.",
  },
  {
    Icono: FileBadge,
    titulo: `Registro CAAT ${company.caat.codigo}`,
    texto:
      "Código Alfanumérico Armonizado del Transportista para la gestión aduanera de las mercancías.",
  },
  {
    Icono: Leaf,
    titulo: "Permisos ambientales",
    texto: `Contamos con permisos ambientales en: ${company.permisosAmbientales.join(
      ", "
    )}.`,
  },
];

/** Bloque de certificaciones y cumplimiento sobre fondo azul profundo. */
export default function Certificaciones() {
  return (
    <section className="section bg-azul-profundo text-white">
      <Container>
        <Reveal>
          <SectionTitle
            light
            eyebrow="Compromisos"
            title="Certificaciones y cumplimiento"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {certificaciones.map(({ Icono, titulo, texto }, i) => (
            <Reveal key={titulo} delay={i * 90}>
              <article className="h-full rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-card bg-white/10 text-white">
                  <Icono className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl text-white">{titulo}</h3>
                <p className="mt-3 text-sm text-azul-claro/85">{texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center gap-6 rounded-card border border-white/15 bg-white/5 p-6 sm:flex-row">
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-card">
              <Image
                src="/galeba-credencial.jpg"
                alt="Credencial y registro de Logistics Galeba"
                fill
                unoptimized
                sizes="160px"
                className="object-cover"
              />
            </div>
            <p className="text-sm text-azul-claro/85">
              {/* TODO: confirmar con el cliente la vigencia y el documento oficial */}
              Operamos con certificación OEA, registro CAAT {company.caat.codigo}{" "}
              y permisos ambientales vigentes en {company.permisosAmbientales.length}{" "}
              estados.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
