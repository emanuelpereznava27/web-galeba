/** @type {import('next').NextConfig} */
const nextConfig = {
  // El sitio prioriza el contenido; desactivamos el lint bloqueante en build
  // para que un aviso de estilo no impida desplegar. Ejecuta `npm run lint` aparte.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Permite placeholders SVG locales mientras se cargan las fotos reales.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
