/**
 * Certificación OEA y los estándares que se publican en el sitio.
 * Contenido literal del documento corporativo. Se muestran solo 4 de los 11
 * estándares (los más relevantes para el cliente): procesos, aduana, vehículos
 * e incidentes.
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
    titulo: "Seguridad de procesos",
    puntos: [
      "Mapeo de procesos",
      "Entrega y recepción de carga",
      "Procedimiento de seguimiento de mercancía",
    ],
  },
  {
    id: 2,
    titulo: "Gestión aduanera",
    puntos: [
      "Registro del Código Alfanumérico Armonizado del Transportista (CAAT)",
      "Procedimiento de seguimiento de mercancía",
    ],
  },
  {
    id: 3,
    titulo:
      "Seguridad de los vehículos de carga, contenedores, remolques y/o semirremolques",
    puntos: [
      "Uso de sellos y/o candados",
      "Inspección de los medios de transporte",
      "Almacenaje de vehículos de transporte, contenedores, remolques y semirremolques",
    ],
  },
  {
    id: 4,
    titulo: "Manejo e investigación de incidentes",
    puntos: [
      "Reporte de anomalías y/o actividades sospechosas",
      "Investigación y análisis",
    ],
  },
];
