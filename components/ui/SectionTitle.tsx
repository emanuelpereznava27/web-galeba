import { type ReactNode } from "react";

/**
 * Título de sección: antetítulo (eyebrow), H2 en mayúsculas y subtítulo.
 * `light` para usar sobre fondos oscuros.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = false,
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <div className={`${center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.18em] ${
            light ? "text-azul-claro/90" : "text-azul-medio"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`text-[clamp(1.8rem,4vw,3rem)] ${light ? "text-white" : ""}`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            light ? "text-azul-claro/85" : "text-gris-texto"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
