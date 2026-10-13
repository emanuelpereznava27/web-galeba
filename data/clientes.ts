/**
 * Clientes principales y sectores atendidos.
 * Los logos viven en /public/clientes/<slug>.svg (placeholder si no existen).
 */

export type Cliente = {
  nombre: string;
  slug: string;
  logo: string;
};

export const clientes: Cliente[] = [
  { nombre: "Essity", slug: "essity", logo: "/clientes/essity.svg" },
  {
    nombre: "SAGE Automotive Interiors",
    slug: "sage-automotive-interiors",
    logo: "/clientes/sage-automotive-interiors.svg",
  },
  { nombre: "BOCAR Group", slug: "bocar-group", logo: "/clientes/bocar-group.svg" },
  { nombre: "Vitro", slug: "vitro", logo: "/clientes/vitro.svg" },
  { nombre: "ZF Group", slug: "zf-group", logo: "/clientes/zf-group.svg" },
  { nombre: "Vibracoustic", slug: "vibracoustic", logo: "/clientes/vibracoustic.svg" },
];

export const clientesEntreOtros = "Entre otros";

/**
 * Sectores derivados de los clientes (sin inventar métricas).
 */
export const sectores: { titulo: string; descripcion: string }[] = [
  {
    titulo: "Automotriz",
    descripcion:
      "Atendemos a fabricantes y proveedores Tier 1 del sector automotriz con entregas sujetas a ventanas de tiempo.",
  },
  {
    titulo: "Manufactura",
    descripcion:
      "Traslado de insumos y producto terminado para plantas y centros de distribución industriales.",
  },
  {
    titulo: "Vidrio",
    descripcion:
      "Manejo cuidadoso de producto de vidrio, con sujeción y protección para evitar daños en tránsito.",
  },
  {
    titulo: "Consumo",
    descripcion:
      "Distribución de producto de consumo y paquetería industrial en corredores regionales.",
  },
];

/**
 * Testimonio genérico: la empresa no autoriza publicar nombres ni citas de
 * clientes, por lo que se muestra un mensaje institucional.
 */
export const testimonial = {
  texto:
    "Nuestros clientes nos confían sus cadenas de suministro más exigentes. Por acuerdos de confidencialidad no publicamos testimonios firmados, pero podemos compartir referencias durante el proceso de cotización.",
  autor: "Logistics Galeba",
  cargo: "Equipo comercial",
};
