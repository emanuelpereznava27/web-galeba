/**
 * Datos corporativos de Logistics Galeba, S.A. de C.V.
 * Fuente única de verdad: TODO el contenido textual sale de aquí, nunca
 * hardcodeado en los componentes.
 */

export type DepartamentoContacto = {
  correo: string;
  whatsapp: string[];
};

export const company = {
  nombre: "Logistics Galeba, S.A. de C.V.",
  nombreCorto: "Logistics Galeba",
  slogan: "Transportamos más que carga, movemos tu éxito",
  fundacion: 1998,
  web: "www.galeba.com.mx",
  mapsUrl: "https://maps.app.goo.gl/uLzuhwY6CJeYm2S49",

  // Descripciones cortas usadas en varias secciones
  descripcionCorta: "Transporte de carga terrestre y logística",

  // Datos fiscales y de contacto (mostrados en la ficha de "Nosotros").
  // TODO: confirmar con el cliente.
  rfc: "LGA1212067R1",
  giro: "Autotransporte federal de carga",
  direccion:
    "Circuito Granjas S/N, San Miguel Totoltepec, Toluca, Estado de México",

  // Texto de presentación (literal de la presentación corporativa).
  presentacion:
    "Logistics Galeba, S.A. de C.V. es una empresa mexicana especializada en soluciones de transporte de carga terrestre y logística, con cumplimiento normativo. Fundada en 1998, cuenta con más de 28 años de experiencia brindando soluciones confiables a diversos sectores industriales. Nuestra operación se distingue por el uso de tecnología de rastreo GPS y personal altamente capacitado.",

  valores: [
    "Honestidad, justicia e integridad",
    "Seguridad en cada operación",
    "Puntualidad y cumplimiento",
    "Excelencia en el servicio",
  ],

  // Contactos por departamento. El WhatsApp de cotizaciones es el de gerencia;
  // el correo de cotizaciones se define más abajo en `cotizaciones`.
  contactos: {
    gerencia: {
      correo: "gerencia@galeba.com",
      whatsapp: ["722 492 4070"],
    },
  },

  /**
   * Canal de cotizaciones: es el destino de la solicitud del formulario.
   * WhatsApp (722) 492 4070 y correo gerencia@galeba.com.
   */
  cotizaciones: {
    whatsapp: "722 492 4070",
    correo: "gerencia@galeba.com",
  },

  historia: [
    { anio: 1998, titulo: "Fundación de la empresa" },
    { anio: 2012, titulo: "Cambio de razón social" },
    { anio: 2014, titulo: "Permisos ambientales" },
    { anio: 2021, titulo: "Certificación OEA" },
    { anio: 2026, titulo: "Incremento de la flotilla" },
  ],

  servicios: [
    "Monitoreo satelital 24/7",
    "Atención personalizada",
    "Rutas dedicadas",
  ],

  flota: [
    "Tractocamiones",
    "Tortons",
    "Camionetas 3.5 T",
    "Camión volteo",
    "Cajas secas 53'",
    "Plataformas de 42'",
    "Lowboy",
    "Cama baja",
  ],

  clientes: [
    "Essity",
    "SAGE Automotive Interiors",
    "BOCAR Group",
    "Vitro",
    "ZF Group",
    "Vibracoustic",
  ],

  permisosAmbientales: [
    "Chihuahua",
    "Saltillo",
    "San Luis Potosí",
    "Querétaro",
    "Estado de México",
  ],

  caat: {
    codigo: "21HB",
    perfil: "Terrestre",
    inicio: "2026-09-11",
    fin: "2027-09-11",
  },
} as const;

/** Número de WhatsApp principal (gerencia) para el botón flotante. */
export const whatsappPrincipal = company.contactos.gerencia.whatsapp[0];

/* ─────────────────────────────────────────────────────────────
   Helpers de enlaces (tel:, mailto:, wa.me)
   ───────────────────────────────────────────────────────────── */

/** Normaliza un teléfono mexicano a dígitos con lada país: 722 492 4070 → 527224924070 */
export function soloDigitos(numero: string): string {
  return numero.replace(/\D/g, "");
}

export function waLink(numero: string, mensaje?: string): string {
  const base = `https://wa.me/52${soloDigitos(numero)}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function telLink(numero: string): string {
  return `tel:+52${soloDigitos(numero)}`;
}

export function mailtoLink(correo: string, asunto?: string): string {
  return asunto ? `mailto:${correo}?subject=${encodeURIComponent(asunto)}` : `mailto:${correo}`;
}
