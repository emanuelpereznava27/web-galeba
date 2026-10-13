import type { Metadata } from "next";
import NosotrosHero from "@/components/sections/NosotrosHero";
import NosotrosHistoria from "@/components/sections/NosotrosHistoria";
import Timeline from "@/components/sections/Timeline";
import MisionVision from "@/components/sections/MisionVision";
import Valores from "@/components/sections/Valores";
import DatosEmpresa from "@/components/sections/DatosEmpresa";
import Certificaciones from "@/components/sections/Certificaciones";
import CtaFinal from "@/components/sections/CtaFinal";

export const metadata: Metadata = {
  title: "Nosotros | Quiénes somos, historia, misión y visión",
  description:
    "Logistics Galeba es una empresa mexicana de transporte de carga y logística fundada en 1998. Conoce nuestra historia, misión, visión, valores y certificaciones.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <NosotrosHistoria />
      <Timeline />
      <MisionVision />
      <Valores />
      <DatosEmpresa />
      <Certificaciones />
      <CtaFinal />
    </>
  );
}
