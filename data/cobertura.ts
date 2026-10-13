/**
 * Cobertura: permisos ambientales.
 * Coordenadas relativas (porcentaje) sobre el SVG estilizado de México
 * (viewBox 0 0 600 400) definido en components/sections/Cobertura.tsx.
 */

export type PuntoCobertura = {
  estado: string;
  /** Posición horizontal en % del ancho del mapa */
  x: number;
  /** Posición vertical en % del alto del mapa */
  y: number;
};

export const permisoIntro = "Contamos con PERMISOS AMBIENTALES EN";

export const puntosCobertura: PuntoCobertura[] = [
  { estado: "Chihuahua", x: 22, y: 30 },
  { estado: "Saltillo", x: 42, y: 34 },
  { estado: "San Luis Potosí", x: 48, y: 50 },
  { estado: "Querétaro", x: 55, y: 57 },
  { estado: "Estado de México", x: 61, y: 62 },
];

export const coberturaNota =
  "Permisos ambientales vigentes. Consulta cobertura de otras rutas con nuestro equipo.";
