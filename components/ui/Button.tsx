import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "white" | "outline" | "line";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  white: "btn-white",
  outline: "btn-outline",
  line: "btn-line",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  block?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  /** Fuerza etiqueta <a> (para enlaces externos, tel:, mailto:, wa.me). */
  external?: boolean;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/**
 * Botón unificado. Si recibe `href` renderiza un enlace (Next Link o <a>),
 * si no, un <button>.
 */
export default function Button(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className = "", block } = props;
  const classes = `btn ${variantClass[variant]} ${block ? "w-full" : ""} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    const isExternal =
      external ||
      /^(https?:|tel:|mailto:|#)/.test(href) ||
      href.includes("wa.me");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, block: _b, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
