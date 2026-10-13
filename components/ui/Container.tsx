import { type ReactNode } from "react";

/** Contenedor central con el ancho máximo del sitio (1240px). */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
}
