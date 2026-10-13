import { Mail, MessageCircle } from "lucide-react";
import { company, mailtoLink, waLink } from "@/data/company";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/** CTA final de la home. */
export default function CtaFinal() {
  return (
    <section className="bg-azul-corporativo py-16 text-white">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] text-white">
            ¿Listo para mover tu carga?
          </h2>
          <p className="mt-3 max-w-2xl text-azul-claro/90">
            Cuéntanos origen, destino y tipo de carga. Recibe una propuesta a tu medida.
          </p>
        </Reveal>

        <Reveal delay={80} className="w-full">
          <div className="flex flex-col items-center gap-4">
            <Button href="/contacto" variant="white">
              Cotizar ahora
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-azul-claro/90">
              <a
                href={mailtoLink(company.contactos.gerencia.correo)}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {company.contactos.gerencia.correo}
              </a>
              <a
                href={waLink(
                  company.contactos.gerencia.whatsapp[0],
                  "Hola, me interesa cotizar un servicio de transporte con Logistics Galeba"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {company.contactos.gerencia.whatsapp[0]}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
