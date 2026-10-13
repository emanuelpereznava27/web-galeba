import { type ReactNode } from "react";

/** Tarjeta blanca con borde y elevación al hover (clase .card de globals.css). */
export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <Tag className={`card ${className}`}>{children}</Tag>;
}
