"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "galeba-consent";

/**
 * Banner simple de cookies. Guarda la decisión y notifica a <Analytics/>.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* almacenamiento no disponible */
    }
    window.dispatchEvent(new CustomEvent("galeba:consent", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-card border border-gris-borde bg-white p-5 shadow-lg"
    >
      <p className="text-sm text-gris-texto">
        Usamos cookies propias y de análisis para entender cómo se usa el sitio.
        Puedes aceptar o rechazar su uso.{" "}
        <a href="/aviso-de-privacidad" className="font-semibold text-azul-corporativo underline">
          Aviso de privacidad
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="btn btn-primary"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide("rejected")}
          className="btn btn-line"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
