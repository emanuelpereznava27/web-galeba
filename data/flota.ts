/**
 * Flota e infraestructura.
 * Las descripciones son genéricas y están marcadas para confirmar con el cliente.
 */

export type CategoriaCargaId = "general" | "contenedores" | "maquinaria" | "granel";

export type Unidad = {
  slug: string;
  nombre: string;
  /** Nombre del icono lucide-react (ver mapa en components/sections/Flota.tsx) */
  icono: string;
  descripcion: string;
  usos: string[];
  categorias: CategoriaCargaId[];
  /** Ruta de la foto real. Mientras no exista se muestra un placeholder gris. */
  foto?: string;
  nota?: string;
};

export const categorias: { id: CategoriaCargaId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "contenedores", label: "Contenedores" },
  { id: "maquinaria", label: "Maquinaria pesada" },
  { id: "granel", label: "Materiales a granel" },
];

export const flota: Unidad[] = [
  {
    slug: "tractocamiones",
    nombre: "Tractocamiones",
    icono: "Truck",
    // TODO: confirmar con el cliente
    descripcion:
      "Unidad motriz para arrastrar cajas secas, plataformas y equipo especializado en rutas de largo recorrido.",
    usos: ["Carga general", "Contenedores", "Rutas foráneas"],
    categorias: ["general", "contenedores"],
  },
  {
    slug: "tortons",
    nombre: "Tortons",
    icono: "Truck",
    // TODO: confirmar con el cliente
    descripcion:
      "Camión de dos ejes ideal para distribución regional y entregas en zonas urbanas e industriales.",
    usos: ["Distribución regional", "Carga general"],
    categorias: ["general"],
  },
  {
    slug: "camionetas-3-5-t",
    nombre: "Camionetas 3.5 T",
    icono: "Car",
    // TODO: confirmar con el cliente
    descripcion:
      "Vehículos ligeros para entregas puntuales, paquetería industrial y cargas de bajo tonelaje.",
    usos: ["Entregas puntuales", "Cargas ligeras"],
    categorias: ["general"],
  },
  {
    slug: "camion-volteo",
    nombre: "Camión volteo",
    icono: "Construction",
    // TODO: confirmar con el cliente
    descripcion:
      "Unidad con caja volteo para el traslado y descarga de materiales a granel y agregados.",
    usos: ["Materiales a granel", "Obra y construcción"],
    categorias: ["granel"],
  },
  {
    slug: "cajas-secas-53",
    nombre: "Cajas secas de 53'",
    icono: "Package",
    // TODO: confirmar con el cliente (asumimos pies)
    descripcion:
      "Caja cerrada de 53 pies para mercancía paletizada que requiere protección contra el clima.",
    usos: ["Tarimas", "Contenedores", "Carga general"],
    categorias: ["general", "contenedores"],
    nota: "Asumimos medidas en pies; confirmar con el cliente.",
  },
  {
    slug: "plataformas-42",
    nombre: "Plataformas de 42'",
    icono: "Layers",
    // TODO: confirmar con el cliente (asumimos pies)
    descripcion:
      "Plataforma plana de 42 pies para carga sobredimensionada, materiales y maquinaria.",
    usos: ["Maquinaria pesada", "Carga sobredimensionada"],
    categorias: ["general", "maquinaria"],
    nota: "Asumimos medidas en pies; confirmar con el cliente.",
  },
  {
    slug: "lowboy",
    nombre: "Lowboy",
    icono: "Forklift",
    // TODO: confirmar con el cliente
    descripcion:
      "Semirremolque de piso bajo para el traslado de maquinaria pesada y equipo de gran altura.",
    usos: ["Maquinaria pesada", "Equipo especial"],
    categorias: ["maquinaria"],
  },
  {
    slug: "cama-baja",
    nombre: "Cama baja",
    icono: "Container",
    // TODO: confirmar con el cliente
    descripcion:
      "Plataforma de piso bajo para cargas de gran peso y dimensiones fuera de norma.",
    usos: ["Maquinaria pesada", "Carga especial"],
    categorias: ["maquinaria"],
  },
];

/** Descripción de infraestructura mostrada en la página de Servicios. */
export const infraTexto =
  "En Logistics Galeba, ofrecemos soluciones logísticas eficientes, seguras y puntuales adaptadas a las necesidades de cada cliente.";

/** Nota bajo la lista de servicios. */
export const serviciosNota =
  "Equipo especializado para la seguridad y rastreo en tiempo real.";
