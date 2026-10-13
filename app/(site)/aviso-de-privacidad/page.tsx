import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de Logistics Galeba, S.A. de C.V. sobre el tratamiento de datos personales.",
  alternates: { canonical: "/aviso-de-privacidad" },
};

/**
 * Aviso de privacidad (borrador).
 * TODO: sustituir por el texto legal definitivo revisado por el cliente.
 */
export default function AvisoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Aviso de privacidad"
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Aviso de privacidad" },
        ]}
      />
      <section className="section">
        <Container>
          <div className="max-w-3xl space-y-4 text-gris-texto">
            <p>
              <strong>{company.nombre}</strong>, con domicilio en el Estado de México, es
              responsable del tratamiento de sus datos personales conforme a la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares.
            </p>
            <p>
              Los datos que usted proporciona a través de este sitio (nombre, empresa, correo,
              teléfono y detalles de su solicitud) se utilizan únicamente para atender su
              petición de cotización y dar seguimiento comercial.
            </p>
            <p>
              Para ejercer sus derechos de acceso, rectificación, cancelación u oposición (ARCO),
              puede escribir a{" "}
              <a
                href={`mailto:${company.contactos.gerencia.correo}`}
                className="font-semibold text-azul-corporativo underline"
              >
                {company.contactos.gerencia.correo}
              </a>
              .
            </p>
            <p className="rounded-card border border-dashed border-gris-borde bg-azul-claro/60 p-4 text-sm">
              Documento de ejemplo. El texto legal definitivo debe ser revisado y aprobado por el
              cliente antes de su publicación.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
