import Image from "next/image";
import { Truck } from "lucide-react";
import { company } from "@/data/company";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

const anios = new Date().getFullYear() - company.fundacion;

const filas: Array<[string, string]> = [
  ["Razón social", company.nombre],
  ["RFC", company.rfc],
  ["Giro", company.giro],
  ["Ubicación", company.direccion],
  ["Correo", company.contactos.gerencia.correo],
  ["Web", company.web],
  ["Fundación", `${company.fundacion} · más de ${anios} años`],
];

/** Ficha corporativa (datos de la empresa) y tipos de flota. */
export default function DatosEmpresa() {
  return (
    <section className="section">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <SectionTitle eyebrow="Ficha" title="Datos de la empresa" />

          <dl className="mt-8 overflow-hidden rounded-card border border-gris-borde shadow-soft">
            {filas.map(([clave, valor], i) => (
              <div
                key={clave}
                className={`grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-3.5 text-sm sm:grid-cols-[10.5rem_1fr] ${
                  i % 2 ? "bg-white" : "bg-azul-claro/60"
                }`}
              >
                <dt className="font-heading text-xs font-bold uppercase tracking-wide text-azul-profundo">
                  {clave}
                </dt>
                <dd className="text-gris-texto">{valor}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-card shadow-lg">
            <div className="relative aspect-[5/4]">
              <Image
                src="/img/nosotros-equipo.jpg"
                alt="Equipo y flota de Logistics Galeba"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <h3 className="mt-6 flex items-center gap-2 font-heading text-lg font-bold text-azul-profundo">
            <Truck className="h-5 w-5 text-azul-medio" aria-hidden="true" />
            Nuestra flota (por tipo)
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {company.flota.map((tipo) => (
              <li key={tipo} className="pill">
                {tipo}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gris-texto/80">
            Las cantidades no se publican; se muestra el tipo de equipo
            disponible.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
