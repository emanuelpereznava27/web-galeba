import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import QuienesSomos from "@/components/sections/QuienesSomos";
import Servicios from "@/components/sections/Servicios";
import FlotaPreview from "@/components/sections/FlotaPreview";
import OeaBand from "@/components/sections/OeaBand";
import Clientes from "@/components/sections/Clientes";
import CtaFinal from "@/components/sections/CtaFinal";

export const metadata: Metadata = {
  title: {
    absolute:
      "Logistics Galeba | Transporte de carga terrestre y logística en México · Certificación OEA",
  },
  description:
    "Más de 28 años moviendo tu éxito. Transporte de carga terrestre y logística con certificación OEA, registro CAAT, monitoreo satelital 24/7 y permisos ambientales en 5 estados.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <QuienesSomos />
      <Servicios />
      <FlotaPreview />
      <OeaBand />
      <Clientes />
      <CtaFinal />
    </>
  );
}
