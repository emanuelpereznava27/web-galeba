"use client";

import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "galeba-consent";

/**
 * Carga Google Analytics 4 únicamente si hay ID configurado y el usuario
 * aceptó las cookies. Sin ID o sin consentimiento no se carga nada.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    const loadScript = () => {
      if (document.getElementById("ga-script")) return;
      const s = document.createElement("script");
      s.id = "ga-script";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);

      const inline = document.createElement("script");
      inline.id = "ga-inline";
      inline.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`;
      document.head.appendChild(inline);
    };

    const check = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY) === "accepted") loadScript();
      } catch {
        /* sin almacenamiento */
      }
    };

    check();
    const onConsent = () => check();
    window.addEventListener("galeba:consent", onConsent);
    return () => window.removeEventListener("galeba:consent", onConsent);
  }, []);

  return null;
}
