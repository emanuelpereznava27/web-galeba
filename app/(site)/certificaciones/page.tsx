import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import OEA from "@/components/sections/OEA";
import CtaFinal from "@/components/sections/CtaFinal";

export const metadata: Metadata = {
  title: "Certificaciones | OEA y CAAT",
  description:
    "Certificación Operador Económico Autorizado (OEA) y el registro CAAT de Logistics Galeba.",
  alternates: { canonical: "/certificaciones" },
};

export default function CertificacionesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cumplimiento normativo"
        title="Certificaciones"
        subtitle="Operador Económico Autorizado y registro CAAT."
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Certificaciones" },
        ]}
      />
      <OEA />
      <CtaFinal />
    </>
  );
}
