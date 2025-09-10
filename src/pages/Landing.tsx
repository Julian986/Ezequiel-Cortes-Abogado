import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Scale,
  Users,
  Shield,
  Clock,
  Play,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  Youtube
} from "lucide-react";
import fondoHero from "../assets/fondo_hero.png";

/**
 * Landing page para el abogado Ezequiel Cortés – Bahía Blanca
 * Tech: React + TypeScript + TailwindCSS + Framer Motion + Lucide icons
 *
 * Instrucciones rápidas:
 * - Copiá este archivo como `Landing.tsx` y úsalo como componente de página.
 * - Reemplazá los datos en `SITE` con los reales (teléfono, email, dirección).
 * - Los colores principales son blanco (#fff), dorado (#C3A572) y verde oscuro (#0F2E2E).
 * - El mapa usa un embed genérico de Google Maps por lat/lng.
 */

const SITE = {
  fullName: "Ezequiel Cortés",
  initials: "EC",
  profession: "Abogado",
  city: "Bahía Blanca",
  specialties: ["Laboral", "Civil y Comercial", "Familia"],
  // Reemplazar con datos reales cuando estén disponibles
  phone: "", // Ej: +54 9 291 123-4567
  whatsapp: "", // Ej: https://wa.me/5492911234567
  email: "", // Ej: consultas@estudioezequiel.com
  address: "Bahía Blanca, Buenos Aires",
  instagram: "https://www.instagram.com/ezequiel.cortes.abogado/",
  mapsUrl:
    "https://www.google.com.ar/maps/place/Ezequiel+Cort%C3%A9s+%7C+Abogado+Bahia+Blanca+%7C+Laboral,+Civil+y+de+Familia/@-38.7236617,-62.2656812,17z/data=!3m1!4b1!4m6!3m5!1s0x95edbdc5feb7eb23:0xe777f9ceacc46f5f!8m2!3d-38.7236659!4d-62.2631063!16s%2Fg%2F11l1fcsxlf?hl=es",
  lat: -38.7236659,
  lng: -62.2631063,
};

const COLORS = {
  green: "#0F2E2E",
  gold: "#C3A572",
  navy: "#0C1320",
};

function useScrolled(threshold = 100) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
        <span className="uppercase tracking-widest text-xs text-neutral-500">{SITE.city}</span>
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">{title}</h2>
      {subtitle ? (
        <p className="text-neutral-600 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-sm shadow-sm border border-neutral-200">
      {children}
    </span>
  );
}

function ServiceCard({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<any>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl bg-white shadow-sm border border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="rounded-2xl p-3 border border-neutral-200 bg-white">
          <Icon className="size-6 text-[var(--green)]" />
        </div>
        <h3 className="text-xl font-semibold text-black">{title}</h3>
      </div>
      <p className="text-neutral-600 leading-relaxed mb-4">{desc}</p>
      <button className="inline-flex items-center gap-2 text-white font-medium">
        Más información <ChevronDown className="size-4" />
      </button>
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between"
      >
        <span className="font-medium text-neutral-900">{q}</span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 pt-0 text-neutral-600 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Landing() {
  const scrolled = useScrolled();

  const mapsEmbed = useMemo(
    () => `https://maps.google.com/maps?q=${SITE.lat},${SITE.lng}&z=15&output=embed`,
    []
  );

  const whatsappCTA = useMemo(() => {
    const base = SITE.whatsapp || "https://wa.me/";
    const text = encodeURIComponent(
      `Hola ${SITE.fullName}, me gustaría hacer una consulta legal. Soy de ${SITE.city}.`
    );
    return SITE.whatsapp ? `${SITE.whatsapp}?text=${text}` : `${base}?text=${text}`;
  }, []);

  // Formulario de contacto (envía a WhatsApp por defecto, con fallback a mailto)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const composed = `Consulta desde la web%0A%0ANombre: ${encodeURIComponent(
      name || "—"
    )}%0ATeléfono: ${encodeURIComponent(phone || "—")}%0AMensaje: ${encodeURIComponent(
      message || "—"
    )}`;

    const wa = SITE.whatsapp
      ? `${SITE.whatsapp}?text=${composed}`
      : `https://wa.me/?text=${composed}`;

    // Intento principal: WhatsApp
    window.open(wa, "_blank");

    // Fallback opcional a email si estuviera configurado
    if (SITE.email) {
      const subject = encodeURIComponent("Nueva consulta desde la web");
      const body = `Nombre: ${name || "—"}\nTeléfono: ${phone || "—"}\nMensaje: ${message || "—"}`;
      const mail = `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setTimeout(() => window.open(mail, "_blank"), 400);
    }
  }

  return (
    <div
      style={{
        // CSS variables para usar en Tailwind con [var(--...)]
        // @ts-ignore - CSSProperties permite strings
        "--green": COLORS.green,
        "--gold": COLORS.gold,
        "--navy": COLORS.navy,
      }}
      className="min-h-dvh bg-neutral-50 text-neutral-900"
    >
      {/* CONTACT BAR - Barra superior como en Estudio Riccio */}
      <div className="bg-neutral-800 text-neutral-300 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-end items-center gap-6">
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="size-4" />
            {SITE.email}
          </a>
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-white">
            <Phone className="size-4" />
            {SITE.phone}
          </a>
        </div>
      </div>
  
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-black/20 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className={`size-12 rounded border-2 flex items-center justify-center ${
                  scrolled 
                    ? 'bg-white border-neutral-300' 
                    : 'bg-white/90 backdrop-blur-sm border-white/50'
                }`}>
                  <div className={`text-2xl font-serif font-bold ${
                    scrolled ? 'text-neutral-700' : 'text-neutral-800'
                  }`}>
                    {SITE.initials}
                  </div>
                </div>
              </div>
              <div className="leading-tight">
                <div className={`font-light text-lg ${scrolled ? 'text-neutral-800' : 'text-white drop-shadow-lg'}`}>
                  {SITE.fullName}
                </div>
              </div>
            </a>
  
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#inicio" 
                className={`text-base font-light tracking-wide hover:text-[var(--gold)] transition-colors ${
                  scrolled ? 'text-neutral-800' : 'text-white drop-shadow-md'
                }`}
                style={{ color: scrolled ? '#1f2937' : 'white' }}
              >
                Inicio
              </a>
              <a 
                href="#servicios" 
                className={`text-base font-light tracking-wide hover:text-[var(--gold)] transition-colors ${
                  scrolled ? 'text-neutral-800' : 'text-white drop-shadow-md'
                }`}
                style={{ color: scrolled ? '#1f2937' : 'white' }}
              >
                Servicios
              </a>
              <a 
                href="#abogado" 
                className={`text-base font-light tracking-wide hover:text-[var(--gold)] transition-colors ${
                  scrolled ? 'text-neutral-800' : 'text-white drop-shadow-md'
                }`}
                style={{ color: scrolled ? '#1f2937' : 'white' }}
              >
                Abogado
              </a>
              <a 
                href="#testimonios" 
                className={`text-base font-light tracking-wide hover:text-[var(--gold)] transition-colors ${
                  scrolled ? 'text-neutral-800' : 'text-white drop-shadow-md'
                }`}
                style={{ color: scrolled ? '#1f2937' : 'white' }}
              >
                Noticias
              </a>
              <a 
                href="#contacto" 
                className={`text-base font-light tracking-wide hover:text-[var(--gold)] transition-colors ${
                  scrolled ? 'text-neutral-800' : 'text-white drop-shadow-md'
                }`}
                style={{ color: scrolled ? '#1f2937' : 'white' }}
              >
                Contacto
              </a>
            </nav>
          </div>
        </div>
      </header>
  
      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/fondo_hero.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
        </div>
  
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight text-white drop-shadow-lg">
              {SITE.fullName}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-4 text-white drop-shadow-md">
              Nos apasiona brindar soluciones estratégicas y personalizadas a cada uno de 
              nuestros clientes. Con experiencia y compromiso, trabajamos para ofrecer un 
              servicio de calidad, basado en la confianza y la excelencia.
            </p>
            
            {/* Call to action subtitle */}
            <p className="text-lg md:text-xl font-light mb-12 text-white drop-shadow-md">
              ¡Estamos acá para ayudarte!
            </p>
            
            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              href={whatsappCTA}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white px-8 py-4 text-lg font-light tracking-wide transition-all duration-300 hover:shadow-lg"
            >
              Contactate con nosotros
            </motion.a>
          </motion.div>
        </div>
      </section>
  
      {/* ABOGADO SECTION - Similar al layout de Estudio Riccio */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="/imagen_perfil.png"
                  alt="Ezequiel Cortés - Abogado"
                  className="w-full h-auto rounded-lg shadow-lg object-contain"
                />
                {/* Name overlay */}
                <div className="absolute bottom-6 left-6 bg-[var(--gold)] text-[var(--navy)] px-6 py-3 shadow-lg rounded">
                  <div className="font-semibold text-lg">{SITE.fullName}</div>
                  <div className="text-sm opacity-90">{SITE.profession}</div>
                </div>
              </div>
            </motion.div>
  
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-16 bg-[var(--gold)]"></div>
                <h2 className="text-4xl md:text-5xl font-light text-neutral-800">Abogado</h2>
              </div>
  
              <p className="text-lg leading-relaxed text-neutral-600 font-light">
                A través de mi canal de YouTube analizo los casos judiciales más relevantes de la actualidad, 
                con un enfoque claro, accesible y riguroso. Mi propósito es acercar el derecho a todas las 
                personas, explicando de forma sencilla cómo funciona y cómo incide en nuestra vida cotidiana.
              </p>
              
              <p className="text-lg leading-relaxed text-neutral-600 font-light">
                Me especializo en descomponer noticias jurídicas complejas, traducir conceptos legales al 
                lenguaje común y ofrecer una perspectiva informada sobre los temas que generan debate en la 
                sociedad. No solo busco informar, sino también fomentar la reflexión crítica y la conciencia 
                sobre el papel fundamental que cumplen las leyes en nuestra realidad.
              </p>
  
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a
                  href={whatsappCTA}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-neutral-800 text-neutral-800 px-6 py-3 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <MessageCircle className="size-5" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 border-2 border-neutral-300 text-neutral-600 px-6 py-3 hover:border-neutral-800 hover:text-neutral-800 transition-colors"
                >
                  <Mail className="size-5" />
                  Email
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-neutral-300 text-neutral-600 px-6 py-3 hover:border-neutral-800 hover:text-neutral-800 transition-colors"
                >
                  <Play className="size-5" />
                  YouTube
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Áreas de Especialización Legal"
            subtitle="Soluciones claras y personalizadas para defender tus derechos."
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              Icon={Gavel}
              title="Laboral"
              desc="Despidos, diferencias salariales, accidentes de trabajo, acoso laboral. Te acompañamos en todo el proceso para proteger tus derechos."
            />
            <ServiceCard
              Icon={Scale}
              title="Civil y Comercial"
              desc="Contratos, daños y perjuicios, alquileres, defensa del consumidor, ejecuciones y cobros."
            />
            <ServiceCard
              Icon={Users}
              title="Familia"
              desc="Alimentos, régimen de comunicación, divorcios, cuidado personal y medidas urgentes."
            />
          </div>
        </div>
      </section>

      {/* ABOGADO */}
      <section id="abogado" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Acerca del Estudio"
            subtitle="Compromiso, transparencia y comunicación constante."
          />
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <div className="prose prose-neutral max-w-none">
                <p>
                  Brindamos un asesoramiento cercano y honesto, con enfoque estratégico orientado a resultados. Nos tomamos el tiempo para explicar cada paso y que tomes decisiones informadas.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mt-6">
                  {[
                    "Estrategia personalizada para cada caso",
                    "Gestión ágil de presentaciones y plazos",
                    "Comunicación clara en lenguaje simple",
                    "Honorarios transparentes y por etapas",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[var(--gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={whatsappCTA}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--green)] text-white px-4 py-2 font-medium shadow hover:opacity-95"
                >
                  <MessageCircle className="size-4" /> Solicitar consulta
                </a>
                {SITE.email && (
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 font-medium hover:bg-neutral-50"
                  >
                    <Mail className="size-4" /> Escribir por correo
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                <iframe
                  title="Ubicación en Google Maps"
                  src={mapsEmbed}
                  width="100%"
                  height="350"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--green)] font-medium"
              >
                <MapPin className="size-4" /> Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Testimonios de clientes"
            subtitle="Experiencias reales de personas que confiaron su caso en nuestras manos."
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "María R.",
                text:
                  "Excelente trato y claridad para explicar cada paso. Logramos resolver el conflicto sin demoras.",
              },
              {
                name: "Julián P.",
                text:
                  "Muy buena comunicación y compromiso. Sentí acompañamiento durante todo el proceso.",
              },
              {
                name: "Fernando G.",
                text:
                  "Profesional serio y estratégico. El resultado superó mis expectativas.",
              },
            ].map((t) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white p-6 border border-neutral-200 shadow-sm"
              >
                <p className="text-neutral-700 leading-relaxed">{t.text}</p>
                <footer className="mt-4 text-sm font-medium text-neutral-900">{t.name}</footer>
              </motion.blockquote>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-6 text-center">
            Las opiniones son ilustrativas. El resultado de un caso depende de sus circunstancias particulares.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <SectionHeading title="Preguntas frecuentes" />
          <div className="grid gap-4">
            <FAQItem
              q="¿Cómo coordino una consulta?"
              a="Podés escribir por WhatsApp desde los botones de la web y coordinar día y horario. También podemos realizar la consulta por videollamada."
            />
            <FAQItem
              q="¿Cuáles son los costos?"
              a="Los honorarios se establecen de forma transparente y por etapas, de acuerdo a la complejidad del caso y a la normativa vigente."
            />
            <FAQItem
              q="¿Trabajan con urgencias?"
              a="Sí, ante medidas urgentes en procesos de familia o cautelares civiles, priorizamos la presentación inmediata."
            />
            <FAQItem
              q="¿Qué documentación necesito?"
              a="En la primera consulta te indicamos exactamente qué documentos reunir. Si no los tenés a mano, te guiamos para conseguirlos."
            />
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            title="Contacto"
            subtitle="Contanos brevemente tu consulta y te respondemos a la brevedad."
          />
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <div className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3">Datos de contacto</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <MapPin className="size-4 text-[var(--green)]" /> {SITE.address}
                  </li>
                  {SITE.email && (
                    <li className="flex items-center gap-3">
                      <Mail className="size-4 text-[var(--green)]" /> {SITE.email}
                    </li>
                  )}
                  {SITE.phone && (
                    <li className="flex items-center gap-3">
                      <Phone className="size-4 text-[var(--green)]" /> {SITE.phone}
                    </li>
                  )}
                  <li className="flex items-center gap-3">
                    <MessageCircle className="size-4 text-[var(--green)]" />
                    <a href={whatsappCTA} target="_blank" rel="noreferrer" className="font-medium text-[var(--green)]">
                      Escribir por WhatsApp
                    </a>
                  </li>
                </ul>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-sm text-neutral-500 hover:text-[var(--green)]"
                >
                  Ver Instagram del estudio
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-neutral-700">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-700">Teléfono</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="Cod. área + número"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm text-neutral-700">Mensaje</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full min-h-[120px] rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Contanos brevemente tu consulta"
                  />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--green)] text-white px-5 py-2.5 font-medium shadow hover:opacity-95"
                  >
                    <MessageCircle className="size-4" /> Enviar por WhatsApp
                  </button>
                  {SITE.email && (
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 font-medium hover:bg-neutral-50"
                    >
                      <Mail className="size-4" /> Enviar por email
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-[var(--green)] text-white grid place-items-center font-semibold">
                {SITE.initials}
              </div>
              <div className="text-sm">
                <div className="font-medium">{SITE.fullName}</div>
                <div className="text-neutral-500">{SITE.profession} · {SITE.city}</div>
              </div>
            </div>
            <div className="text-xs text-neutral-500">
              © {new Date().getFullYear()} {SITE.fullName}. Todo derecho reservado.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}