export type NavItem = { href: string; label: string };

/** Navegación principal. Fuente única para Header, MobileMenu y Footer. */
export const navItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/certificaciones", label: "Certificaciones" },
  { href: "/clientes", label: "Clientes" },
  { href: "/contacto", label: "Contacto" },
];
