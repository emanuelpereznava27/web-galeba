import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { company } from "@/data/company";
import CookieConsent from "@/components/layout/CookieConsent";
import Analytics from "@/components/layout/Analytics";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://galeba.com.mx";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Logistics Galeba | Transporte de carga terrestre y logística en México · Certificación OEA",
    template: "%s | Logistics Galeba",
  },
  description:
    "Logistics Galeba, S.A. de C.V.: transporte de carga terrestre y logística con certificación OEA, registro CAAT, monitoreo satelital 24/7 y permisos ambientales en 5 estados. Más de 28 años moviendo tu éxito.",
  keywords: [
    "transporte de carga terrestre",
    "logística",
    "tractocamiones",
    "caja seca 53",
    "plataforma 42",
    "lowboy",
    "OEA",
    "CAAT",
    "transporte seguro México",
    "monitoreo satelital",
  ],
  authors: [{ name: company.nombre }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: company.nombreCorto,
    title:
      "Logistics Galeba | Transporte de carga terrestre y logística en México",
    description:
      "Certificación OEA, CAAT y monitoreo satelital 24/7. Más de 28 años de experiencia en transporte de carga.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630, alt: company.nombre }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logistics Galeba | Transporte de carga y logística",
    description:
      "Certificación OEA, CAAT y monitoreo satelital 24/7. Más de 28 años de experiencia.",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: "/logo-galeba.png",
    apple: "/logo-galeba.png",
  },
};

/** JSON-LD: Organization + LocalBusiness */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: company.nombre,
        alternateName: company.nombreCorto,
        url: SITE_URL,
        slogan: company.slogan,
        foundingDate: String(company.fundacion),
        email: company.contactos.gerencia.correo,
        logo: `${SITE_URL}/logo-galeba.png`,
        sameAs: [`https://${company.web}`],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: company.nombre,
        image: `${SITE_URL}/img/nosotros-hero.jpg`,
        url: SITE_URL,
        telephone: company.contactos.gerencia.whatsapp.map(
          (t) => `+52 ${t.replace(/\s/g, "")}`
        ),
        email: company.contactos.gerencia.correo,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Estado de México",
          addressCountry: "MX",
        },
        areaServed: "MX",
        priceRange: "$$",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-field focus:bg-azul-corporativo focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
        <CookieConsent />
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}
