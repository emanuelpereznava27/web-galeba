# Conectar el dominio `galeba.com.mx` a Vercel (registrador: Cloudflare)

Guía paso a paso para dejar el sitio servido desde el dominio propio.
Hazlo **en este orden**. El código del sitio ya apunta a `https://galeba.com.mx`.

---

## Resumen rápido

| Qué | Dónde |
|---|---|
| Agregar el dominio | Panel de **Vercel** → Settings → Domains |
| Crear el DNS | Panel de **Cloudflare** → DNS → Records |
| **Punto clave** | En Cloudflare, los registros van con **DNS only** (nube **gris**, NO naranja) |

> ⚠️ **Lo más importante:** en Cloudflare, la nube naranja (**Proxied**) pone a
> Cloudflare en medio y, con Vercel, provoca errores de certificado o
> "Too many redirects". Pon **siempre nube GRIS (DNS only)** en los registros
> que apunten a Vercel.

---

## Parte 1 — Agregar el dominio en Vercel

1. Entra a **https://vercel.com** e inicia sesión.
2. Abre tu proyecto (`web-galeba`).
3. Arriba, pestaña **Settings** → menú izquierdo **Domains**.
4. En *Add domain* escribe **`galeba.com.mx`** y llena el cuadro así:
   - **Redirect apex domains to www (recommended):** ❌ **NO marcar** (invertiría el
     orden: dejaría `www` como principal, contra el canonical del sitio).
   - **Connect to an environment:** **Production**.
   - **Redirect to Another Domain:** **No Redirect** (este dominio ES el principal).
   - Pulsa **Add**.
5. Clic en **Add Another Domain** → escribe **`www.galeba.com.mx`** y elige:
   - **Redirect to Another Domain:** **`galeba.com.mx`** (307 o 308; 308 = permanente).
   - Environment: **Production** → **Add**.

Resultado: `galeba.com.mx` sirve el sitio y `www.galeba.com.mx` redirige a la raíz
(mismo sentido que el `next.config.mjs`).

Al principio dirán **"Invalid Configuration"** — es normal, falta el DNS.

### Apunta los valores que te dé Vercel

Vercel te muestra los registros exactos **debajo de cada dominio**. Hoy para este
proyecto recomienda **un `CNAME` para cada uno, con el mismo destino**:

| Tipo | Nombre (Host) | Valor (Target) |
|---|---|---|
| `CNAME` | `@` (raíz) | `40f1acf26a125ccc.vercel-dns-017.com` |
| `CNAME` | `www` | `40f1acf26a125ccc.vercel-dns-017.com` |

> Usa **exactamente** lo que muestre el panel de Vercel (el identificador puede
> cambiar). Los registros "legado" `cname.vercel-dns.com` y `76.76.21.21` siguen
> funcionando como respaldo si Cloudflare no te acepta el `CNAME` en la raíz.

---

## Parte 2 — Crear los registros en Cloudflare

1. Entra a **https://dash.cloudflare.com** e inicia sesión.
2. Haz clic en el dominio **`galeba.com.mx`**.
3. Menú izquierdo → **DNS** → **Records**.
4. **Borra** los registros `A`/`AAAA`/`CNAME` que Cloudflare haya dejado por
   defecto (suelen apuntar a un "parking" o a `2xx` de Cloudflare). Si no los
   borras, choca.
5. Crea/edita el registro de la **raíz**:
   - **Type:** `CNAME`
   - **Name:** `@`
   - **Target:** `40f1acf26a125ccc.vercel-dns-017.com` (sin el punto final)
   - **Proxy status:** 🟠 → cámbialo a **DNS only** (⚪ nube **gris**)
   - **TTL:** `Auto`
   - Guarda (*Save*).
6. Crea/edita el registro de **`www`:**
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Target:** `40f1acf26a125ccc.vercel-dns-017.com` (sin el punto final)
   - **Proxy status:** **DNS only** (⚪ nube **gris**)
   - **TTL:** `Auto`
   - Guarda.

> Si Cloudflare **no te acepta el `CNAME` en `@`** (p. ej. porque el dominio tiene
> correo: registros `MX`/`TXT` en la raíz), usa en su lugar un registro
> **`A` · Name `@` · IPv4 `76.76.21.21`** (Vercel dice que ese legado sigue
> funcionando). El `www` sí déjalo como `CNAME`.

### Cómo se ve la nube (importante)

- ☁️ **Naranja = Proxied** → ❌ **NO** uses esto con Vercel (rompe SSL).
- ⚪ **Gris = DNS only** → ✅ **Esto es lo que quieres.**

### Sobre los "Nameservers de Vercel"

Con **Cloudflare Registrar no aplica** el atajo de apuntar los nameservers a
`ns1/ns2.vercel-dns.com`: Cloudflare obliga a usar sus propios nameservers. Por
eso la única vía es crear los registros **A** y **CNAME** de arriba. (No es
problema, funciona igual.)

---

## Parte 3 — Esperar y verificar

El DNS tarda entre **5 minutos y unas 2 horas** (rara vez 24 h).

### Verificar desde tu PC (PowerShell)

```powershell
Resolve-DnsName galeba.com.mx -Type A
Resolve-DnsName www.galeba.com.mx -Type CNAME
```

Que `galeba.com.mx` devuelva la IP de Vercel y `www` el `cname.vercel-dns.com`.
Luego abre en el navegador:

```
https://galeba.com.mx
https://www.galeba.com.mx
```

Vercel emite el **candado HTTPS (Let's Encrypt) automáticamente** cuando el DNS
resuelve, y los dominios pasan a verde en su panel.

---

## Parte 4 — Dejar `galeba.com.mx` como principal (sin www)

El código **ya redirige** `www.galeba.com.mx` → `galeba.com.mx`. Refuérzalo en
Vercel:

1. **Settings → Domains**.
2. Menú **⋯** junto a `galeba.com.mx` → **Set as Primary Domain**.
3. Si ofrece redirigir `www` a la raíz, acepta.

---

## Parte 5 — Variable de entorno (recomendado)

1. **Settings → Environment Variables**.
2. Agrega:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://galeba.com.mx`
   - **Environments:** **Production** (y Preview si quieres).
3. Guarda.

> Si no la pones, el código ya usa `https://galeba.com.mx` por defecto.

---

## Parte 6 — Desplegar

Cuando el dominio **ya abra** (`https://galeba.com.mx` responde), se sube el
commit pendiente que dejó todo listo (canónico + redirecciones) y Vercel
re-despliega solo.

> Si se despliega **antes** de que el DNS resuelva, `web-galeba.vercel.app`
> redirigirá a `galeba.com.mx` (que aún no carga) y el sitio parecerá caído.
> Por eso el orden importa.

---

## Problemas comunes

| Síntoma | Causa / solución |
|---|---|
| Vercel dice *Invalid Configuration* por horas | Falta o está mal un registro en Cloudflare; revisa que `@`→IP de Vercel y `www`→`cname.vercel-dns.com`. |
| "Too many redirects" o error de SSL | Pusiste la nube **naranja (Proxied)**. Cámbiala a **DNS only (gris)**. |
| `galeba.com.mx` muestra la página de Cloudflare/registrador | Quedó un registro viejo; bórralo. |
| `www` carga pero la raíz no | Falta el registro `A` con Name `@`. |
| La raíz carga pero `www` no | Falta el `CNAME` con Name `www`. |
| Aviso de certificado | Aún no propaga el DNS; espera y recarga. Vercel emite el HTTPS solo. |
| Duda del registrador | Está en **Cloudflare** → dash.cloudflare.com → `galeba.com.mx` → DNS. |
