/**
 * Elemento decorativo firma: columna de 5 puntos azules/blancos.
 * `direction="row"` lo dibuja horizontal (separador de pie de sección).
 */
export default function DotRail({
  direction = "column",
  className = "",
  tone = "azul",
}: {
  direction?: "column" | "row";
  className?: string;
  tone?: "azul" | "blanco";
}) {
  const dotColor = tone === "blanco" ? "bg-white/90" : "bg-azul-medio";
  const layout =
    direction === "column"
      ? "flex-col"
      : "flex-row";

  return (
    <div
      aria-hidden="true"
      className={`flex ${layout} items-center gap-2.5 ${className}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${dotColor} ${
            i === 2 ? "opacity-100" : "opacity-60"
          }`}
        />
      ))}
    </div>
  );
}
