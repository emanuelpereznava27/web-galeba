import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://galeba.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas: { ruta: string; prioridad: number }[] = [
    { ruta: "", prioridad: 1 },
    { ruta: "/nosotros", prioridad: 0.8 },
    { ruta: "/servicios", prioridad: 0.9 },
    { ruta: "/certificaciones", prioridad: 0.8 },
    { ruta: "/clientes", prioridad: 0.7 },
    { ruta: "/contacto", prioridad: 0.9 },
    { ruta: "/aviso-de-privacidad", prioridad: 0.3 },
  ];

  return rutas.map(({ ruta, prioridad }) => ({
    url: `${SITE}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: prioridad,
  }));
}
