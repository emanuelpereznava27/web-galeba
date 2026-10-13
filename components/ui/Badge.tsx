import { type ReactNode } from "react";

/** Etiqueta tipo píldora. `dark` para usar sobre fondos azules. */
export default function Badge({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={
        dark
          ? `badge ${className}`
          : `inline-flex items-center gap-2 rounded-pill border border-azul-medio/30 bg-azul-claro px-3.5 py-1.5 text-xs font-semibold text-azul-corporativo ${className}`
      }
    >
      {children}
    </span>
  );
}
