# Logistics Galeba — Sitio web corporativo

Sitio web de **Logistics Galeba, S.A. de C.V.**, empresa mexicana de transporte de
carga terrestre y logística con cumplimiento normativo.

Construido con **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Todo el
contenido textual vive en `/data`, nunca hardcodeado en los componentes.

---

## 1. Requisitos

- Node.js 18.17 o superior (recomendado 20+)
- npm 9+

## 2. Instalación y comandos

```bash
npm install        # instala dependencias
npm run dev        # entorno de desarrollo → http://localhost:3000
npm run build      # compila para producción
npm start          # sirve la build de producción
npm run lint       # revisa el estilo del código
```

### Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores que necesites:

```bash
cp .env.example .env.local
```

| Variable | Descripción | Por defecto |
|---|---|---|
| `EMAIL_PROVIDER` | `resend` \| `smtp` \| `log` | `log` |
| `RESEND_API_KEY` | API key de Resend | — |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_SECURE` | Servidor SMTP (Nodemailer) | — |
| `MAIL_FROM` | Remitente del formulario | `Sitio Web Galeba <web@galeba.com.mx>` |
| `MAIL_TO_GERENCIA` | Destinatario de cotizaciones | `gerencia@galeba.com` |
| `MAIL_TO_OPERACIONES` | Copia opcional a operaciones (vacío = solo gerencia) | vacío |
| `NEXT_PUBLIC_GA_ID` | ID de Google Analytics 4 (opcional) | vacío |
| `NEXT_PUBLIC_SITE_URL` | URL pública (sitemap/OG/JSON-LD) | `https://www.galeba.com.mx` |

> Con `EMAIL_PROVIDER=log` el formulario **no envía correo**: sólo imprime la
> solicitud en la consola del servidor. Es el modo ideal para demostración.
> En producción, configura `resend` o `smtp`.

---

## 3. Estructura del proyecto

```
app/
  (site)/
    page.tsx                 → Inicio
    nosotros/page.tsx        → Quiénes somos, historia, misión y visión
    servicios/page.tsx       → Servicios e infraestructura (flota)
    certificaciones/page.tsx → OEA, 11 estándares y CAAT
    clientes/page.tsx        → Clientes y cobertura
    contacto/page.tsx        → Contacto y formulario
    aviso-de-privacidad/page.tsx
  api/contacto/route.ts      → Endpoint del formulario
  layout.tsx                 → Fuentes, metadata, JSON-LD, cookies, analítica
  globals.css                → Design tokens y estilos base
  sitemap.ts · robots.ts
components/
  layout/  Header · MobileMenu · Footer · WhatsAppFloat · CookieConsent ·
           Analytics · PageHeader
  sections/Hero · Stats · QuienesSomos · Servicios · Flota · FlotaPreview ·
           OeaBand · Clientes · Cobertura · Timeline · MisionVision · CtaFinal ·
           ContactForm
  ui/      Button · Card · Badge · SectionTitle · Reveal · DotRail · Container
data/      company.ts · flota.ts · oea.ts · clientes.ts · cobertura.ts · nav.ts
public/    logo.svg · img/* · clientes/*
```

---

## 4. Cómo cambiar el contenido

Regla de oro: **el texto no se edita en los componentes**. Modifica los archivos
de `/data`:

- `data/company.ts` — datos de la empresa, contactos, historia, servicios, flota,
  clientes, permisos ambientales y ficha CAAT.
- `data/flota.ts` — tipos de unidad, categorías de carga y descripciones.
- `data/oea.ts` — introducción a la OEA y los 11 estándares.
- `data/clientes.ts` — clientes, sectores y testimonio.
- `data/cobertura.ts` — estados con permisos ambientales y sus coordenadas en el mapa.
- `data/nav.ts` — menú de navegación.

### Tokens de diseño

Los colores, sombras y radios viven como variables CSS en `app/globals.css`
(`:root`) y se exponen a Tailwind en `tailwind.config.ts`. Para cambiar el azul
corporativo basta editar `--azul-corporativo` en `globals.css`.

---

## 5. Formulario de contacto

- Valida en vivo (React Hook Form + Zod) con mensajes en español.
- Honeypot anti-spam + rate limiting básico (5 envíos por IP por hora, en memoria).
- Recibe `?unidad=<slug>` por query string para **precargar** el tipo de unidad
  (los botones «Cotizar este servicio» de la página de Servicios enlazan así).
- Ofrece **dos formas de enviar**: por **correo** (endpoint `/api/contacto`) o por
  **WhatsApp** con los datos ya escritos en el mensaje.
- Estados de carga / éxito / error, con opción de reenviar por WhatsApp.

> Canal de cotizaciones: WhatsApp **722 492 4070** y correo **gerencia@galeba.com**.
> Los números de Operaciones y de Oficina se retiraron a petición del cliente;
> edítalos en `data/company.ts` → `contactos` y `cotizaciones`.

> El rate limiting en memoria es suficiente para un solo servidor. Si despliegas
> en un entorno multi-instancia (p. ej. varias funciones serverless), usa un
> almacén compartido (Redis/Upstash).

---

## 6. Despliegue

### Vercel (recomendado)

1. Sube el repositorio a GitHub/GitLab.
2. Importa el proyecto en Vercel.
3. Configura las variables de entorno de `.env.example` en el panel.
4. Deploy.

### Cualquier hosting Node

```bash
npm run build
npm start
```

---

## 7. Placeholders pendientes y puntos a confirmar

### Imágenes (reemplazar los SVG provisionales)

| Ruta actual | Reemplazar por |
|---|---|
| `public/img/hero-flota.svg` | Foto real del patio con tractocamiones → `hero-flota.jpg` |
| `public/img/camion-rojo.svg` | Foto real de una unidad en operación |
| `public/img/og-image.svg` | Imagen Open Graph 1200×630 |
| `public/clientes/*.svg` | Logos oficiales de cada cliente |

> El hero y «Quiénes somos» ya reservan dimensiones con `next/image` para evitar
> saltos de layout (CLS < 0.1).

### Puntos a confirmar con el cliente

1. **Medidas de unidades** — Se asumió que «Cajas secas 53'» y «Plataformas de
   42'» están en **pies**; confirmar.
2. **Descripciones de cada unidad** — Redactadas de forma genérica (marcadas con
   `// TODO: confirmar con el cliente` en `data/flota.ts`).
3. **Formato de fechas CAAT** — Se usó `2026-09-11` a `2027-09-11`. Confirmar si
   es 11 de septiembre o 9 de noviembre.
4. **Domicilio fiscal** — No se publicó la dirección exacta; la sección de
   ubicación enlaza a Google Maps. Añadir dirección completa si se autoriza.
5. **Aviso de privacidad** — El texto actual es un borrador; debe sustituirse por
   el documento legal revisado por el cliente.
6. **Testimonios** — No se publican citas firmadas de clientes; se usó un mensaje
   institucional. Añadir testimonios reales sólo con autorización.
7. **Logos de clientes** — Mostrados como placeholders tipográficos hasta contar
   con los archivos oficiales.
8. **Analítica** — Configurar `NEXT_PUBLIC_GA_ID` para activar Google Analytics 4
   (sólo se carga si el usuario acepta cookies).

---

## 8. Accesibilidad

- `lang="es-MX"`, HTML semántico y enlace «Saltar al contenido».
- Navegación por teclado, foco visible y trampa de foco en menú móvil y modales.
- Formularios con `label` asociado y errores anunciados con `aria-live`.
- Se respeta `prefers-reduced-motion` (desactiva animaciones y parallax).
- Contraste objetivo WCAG AA.

---

© Logistics Galeba, S.A. de C.V. — www.galeba.com.mx
