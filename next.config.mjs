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
  async redirects() {
    return [
      // Dominio principal: galeba.com.mx (sin www).
      // La versión con www redirige al dominio principal (SEO limpio).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.galeba.com.mx" }],
        destination: "https://galeba.com.mx/:path*",
        permanent: true,
      },
      // La URL de Vercel redirige al dominio propio para no duplicar contenido.
      {
        source: "/:path*",
        has: [{ type: "host", value: "web-galeba.vercel.app" }],
        destination: "https://galeba.com.mx/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
