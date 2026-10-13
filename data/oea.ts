/**
 * Certificación OEA y los 11 estándares.
 * Contenido literal del documento corporativo.
 */

export const oeaIntro =
  "Logistics Galeba cuenta con la certificación Operador Económico Autorizado (OEA), reconocimiento otorgado por la autoridad aduanera a empresas que demuestran altos estándares de seguridad y cumplimiento en la cadena de suministro internacional.";

export type Estandar = {
  id: number;
  titulo: string;
  puntos: string[];
};

export const estandares: Estandar[] = [
  {
    id: 1,
    titulo: "Planeación de seguridad en la cadena de suministros",
    puntos: [
      "Análisis de riesgo",
      "Políticas de seguridad",
      "Auditorías internas en la cadena de suministros",
      "Planes de contingencia o emergencia",
    ],
  },
  {
    id: 2,
    titulo: "Seguridad física",
    puntos: [
      "Instalaciones",
      "Accesos en puertas y casetas",
      "Bardas perimetrales",
      "Estacionamientos",
      "Controles internos",
      "Sistema CCTV",
    ],
  },
  {
    id: 3,
    titulo: "Controles de acceso físico",
    puntos: [
      "Personal de seguridad de riesgo",
      "Identificación de empleados, visitantes y proveedores",
      "Procedimiento de identificación y retiro de personas o vehículos no autorizados",
      "Entregas de mensajería y paquetería",
    ],
  },
  {
    id: 4,
    titulo: "Socios comerciales",
    puntos: [
      "Criterios de selección",
      "Requerimientos de seguridad",
      "Revisiones al socio comercial",
    ],
  },
  {
    id: 5,
    titulo: "Seguridad de procesos",
    puntos: [
      "Mapeo de procesos",
      "Entrega y recepción de carga",
      "Procedimiento de seguimiento de mercancía",
    ],
  },
  {
    id: 6,
    titulo: "Gestión aduanera",
    puntos: [
      "Registro del Código Alfanumérico Armonizado del Transportista (CAAT)",
      "Procedimiento de seguimiento de mercancía",
    ],
  },
  {
    id: 7,
    titulo:
      "Seguridad de los vehículos de carga, contenedores, remolques y/o semirremolques",
    puntos: [
      "Uso de sellos y/o candados",
      "Inspección de los medios de transporte",
      "Almacenaje de vehículos de transporte, contenedores, remolques y semirremolques",
    ],
  },
  {
    id: 8,
    titulo: "Seguridad del personal",
    puntos: [
      "Verificación de antecedentes laborales",
      "Procedimiento para baja del personal",
      "Administración de personal",
    ],
  },
  {
    id: 9,
    titulo: "Seguridad de la información y documentación",
    puntos: [
      "Clasificación y manejo de documentos",
      "Seguridad de la Tecnología de la Información",
    ],
  },
  {
    id: 10,
    titulo: "Capacitación en seguridad y concientización",
    puntos: ["Capacitación y concientización sobre amenazas"],
  },
  {
    id: 11,
    titulo: "Manejo e investigación de incidentes",
    puntos: [
      "Reporte de anomalías y/o actividades sospechosas",
      "Investigación y análisis",
    ],
  },
];

/** Versión corta para las píldoras que orbitan el diagrama OEA. */
export const estandaresCortos: string[] = [
  "Planeación de seguridad",
  "Seguridad física",
  "Controles de acceso",
  "Socios comerciales",
  "Seguridad de procesos",
  "Gestión aduanera",
  "Seguridad de vehículos",
  "Seguridad del personal",
  "Seguridad de la información",
  "Capacitación",
  "Manejo e investigación de incidentes",
];
