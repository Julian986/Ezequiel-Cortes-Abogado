import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Scale,
  Users,
  Clock,
  Play,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

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

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollY > threshold);
    };
    
    // Verificar el estado inicial inmediatamente
    onScroll();
    
    // Múltiples verificaciones para asegurar que funcione en móvil
    const timeouts = [
      setTimeout(onScroll, 50),
      setTimeout(onScroll, 100),
      setTimeout(onScroll, 200)
    ];
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);
  
  return scrolled;
}

function SectionHeading({ title, subtitle, cityText }: { title: string; subtitle?: string; cityText?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
        <span className="uppercase tracking-widest text-xs text-neutral-500">{cityText || SITE.city}</span>
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">{title}</h2>
      {subtitle ? (
        <p className="text-neutral-600 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
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
      <button className="inline-flex items-center gap-2 font-medium text-white" style={{ backgroundColor: 'hsl(225 30% 18%)' }}>
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
      {open && <div className="px-5 pb-5 pt-3 text-neutral-600 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Landing() {
  const scrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Debug del estado del menú móvil
  useEffect(() => {
    console.log('Estado del menú móvil cambió:', mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Función para hacer scroll suave a las secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Cerrar menú móvil al hacer click
  };

  // Cerrar menú móvil al hacer clic fuera y controlar scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false);
      }
    };

    // Controlar scroll del body
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  // Arreglar viewport móvil
  useEffect(() => {
    const handleViewportFix = () => {
      // Prevenir zoom en iOS
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
      
      // Forzar recálculo del viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Prevenir scroll horizontal
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    };

    handleViewportFix();
    window.addEventListener('resize', handleViewportFix);
    window.addEventListener('orientationchange', handleViewportFix);

    return () => {
      window.removeEventListener('resize', handleViewportFix);
      window.removeEventListener('orientationchange', handleViewportFix);
    };
  }, []);

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
  {/*     <div className="bg-neutral-800 text-neutral-300 text-sm py-2">
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
      </div> */}
  
      {/* HEADER ORIGINAL */}
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
              Testimonios
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
      
      {/* Menú móvil */}
      <div className={`mobile-menu fixed top-0 left-0 w-full h-full z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`} style={{ backgroundColor: '#f8f9fa' }}>
        {/* Botón cerrar flotante */}
        <button
          onClick={() => {
            console.log('Botón cerrar flotante clickeado');
            setMobileMenuOpen(false);
          }}
          className="absolute top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="block w-5 h-0.5 rotate-45 translate-y-1 bg-gray-600"></span>
            <span className="block w-5 h-0.5 -rotate-45 -translate-y-1 bg-gray-600"></span>
          </div>
        </button>
        
        <div className="flex flex-col h-full">
          {/* Header del menú móvil con botón cerrar */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded border-2 flex items-center justify-center bg-white border-neutral-300">
                <div className="text-lg font-serif font-bold text-neutral-700">
                  {SITE.initials}
                </div>
              </div>
              <span className="font-bold text-lg text-neutral-800">
                {SITE.fullName}
              </span>
            </div>
            <button
              onClick={() => {
                console.log('Botón cerrar clickeado');
                setMobileMenuOpen(false);
              }}
              className="p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 bg-red-100"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="block w-5 h-0.5 rotate-45 translate-y-1 bg-gray-600"></span>
                <span className="block w-5 h-0.5 -rotate-45 -translate-y-1 bg-gray-600"></span>
              </div>
            </button>
          </div>
          
          {/* Menú móvil */}
          <div className="flex-1 px-6 py-8">
            <ul className="space-y-6 text-gray-700 font-semibold text-xl">
              <li onClick={() => scrollToSection('inicio')} className="hover:text-[var(--gold)] cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Inicio</li>
              <li onClick={() => scrollToSection('servicios')} className="hover:text-[var(--gold)] cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Servicios</li>
              <li onClick={() => scrollToSection('abogado')} className="hover:text-[var(--gold)] cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Abogado</li>
              <li onClick={() => scrollToSection('testimonios')} className="hover:text-[var(--gold)] cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Noticias</li>
              <li onClick={() => scrollToSection('contacto')} className="hover:text-[var(--gold)] cursor-pointer transition-colors duration-200 py-2 border-b border-gray-100">Contacto</li>
            </ul>
          </div>
          
          {/* Footer del menú móvil */}
          <div className="p-6 border-t border-gray-200">
            <a
              href={whatsappCTA}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[var(--gold)] text-white px-4 py-3 rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Consulta WhatsApp
            </a>
          </div>
        </div>
      </div>
  
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
              backgroundRepeat: "no-repeat",
              opacity: 0.8
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
            <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-4 drop-shadow-md" style={{ color: 'hsl(0deg 0% 90% / 80%)' }}>
              Abogado especializado en Derecho Laboral, Civil y Comercial, y de Familia. 
              Brindo asesoramiento jurídico profesional con un enfoque estratégico y personalizado, 
              comprometido con la defensa de los derechos de mis clientes en Bahía Blanca.
            </p>
            
            {/* Call to action subtitle */}
            <p className="text-lg md:text-xl font-light mb-12 drop-shadow-md" style={{ color: 'hsl(0deg 0% 90% / 80%)' }}>
              ¡Estamos acá para ayudarte!
            </p>
            
            {/* CTA Button */}
            <a
              href={whatsappCTA}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-xl rounded-lg border-2 border-transparent hover:border-white/20 opacity-0 animate-fadeIn"
              style={{ 
                backgroundColor: 'hsl(225 30% 18%)',
                color: 'white',
                animationDelay: '1s', 
                animationFillMode: 'forwards' 
              }}
            >
              Contactate con nosotros
            </a>
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
                Con más de una década de experiencia en el ejercicio profesional del derecho, 
                me especializo en brindar soluciones jurídicas efectivas y estratégicas. Mi enfoque 
                se centra en la comunicación clara, la transparencia y el compromiso con cada caso.
              </p>
              
              <p className="text-lg leading-relaxed text-neutral-600 font-light">
                Trabajo con dedicación para proteger los derechos de mis clientes, ofreciendo 
                asesoramiento personalizado y acompañamiento durante todo el proceso legal. 
                Mi objetivo es lograr los mejores resultados posibles mediante estrategias 
                jurídicas sólidas y una comunicación constante.
              </p>
  
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a
                  href={whatsappCTA}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-neutral-300 text-neutral-600 px-6 py-3 transition-colors hover:text-white"
                  style={{ 
                    '--hover-bg': 'hsl(225 30% 18%)'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(225 30% 18%)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <MessageCircle className="size-5" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 border-2 border-neutral-300 text-neutral-600 px-6 py-3 transition-colors hover:text-white"
                  style={{ 
                    '--hover-bg': 'hsl(225 30% 18%)'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(225 30% 18%)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <Mail className="size-5" />
                  Email
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-neutral-300 text-neutral-600 px-6 py-3 transition-colors hover:text-white"
                  style={{ 
                    '--hover-bg': 'hsl(225 30% 18%)'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(225 30% 18%)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <FaInstagram className="size-5" />
                  Instagram
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
            cityText="Especialista en derecho laboral"
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
            cityText="Experiencia Profesional"
          />
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-6 mt-4">
              <div className="prose prose-neutral max-w-none">
                <p>
                Brindamos un asesoramiento cercano y honesto, con un enfoque estratégico orientado a obtener resultados. Nos tomamos el tiempo necesario para explicarte cada paso y ayudarte a tomar decisiones informadas.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mt-6">
                  {[
                    "Estrategia personalizada para cada caso",
                    "Gestión ágil de presentaciones y plazos",
                    "Comunicación clara en lenguaje simple",
                    "Honorarios transparentes y por etapas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="size-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
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
                  className="inline-flex blanco items-center gap-2 rounded-xl text-white px-5 py-3 font-medium shadow hover:opacity-95"
                  style={{ backgroundColor: 'rgb(32, 39, 60)' }}
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
                  //src={mapsEmbed}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.744881465363!2d-62.265686587647615!3d-38.72366587164409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbdc5feb7eb23%3A0xe777f9ceacc46f5f!2sEzequiel%20Cort%C3%A9s%20%7C%20Abogado%20Bahia%20Blanca%20%7C%20Laboral%2C%20Civil%20y%20de%20Familia!5e0!3m2!1ses!2sar!4v1757541404345!5m2!1ses!2sar"
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
            cityText="Casos Exitosos"
          />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Claudia Penalver",
                text:
                  "Quiero agradecer profundamente a mi abogado Ezequiel Cortés y a su equipo por su excelente trabajo en mi caso laboral. Desde el inicio mostró un compromiso genuino, humano y profesional, incluso cuando todo parecía complicado y era difícil ubicar a mi ex empleador. Gracias a su constancia, logró no solo avanzar el proceso, sino también llegar a un acuerdo justo. Me sentí acompañada y respaldada en todo momento. Recomiendo 100% su gestión y su labor, no solo por su eficacia, sino por la buena fe con la que trabaja. ¡Gracias de corazón!",
                rating: 5,
                image: "https://lh3.googleusercontent.com/a-/ALV-UjXbe4loVjLQ6-2JRdVcqTrLqX55yWxb8LF4ot7DDTAp7ONzPuM=w72-h72-p-rp-mo-br100",
              },
              {
                name: "Maria Ramos",
                text:
                  "Excelente atención, cordialidad y acompañamiento absoluto por parte del Dr. Cortés. Agradezco profundamente su acompañamiento. Muy recomendable.",
                rating: 5,
              },
              {
                name: "Silvana Roldan",
                text:
                  "Exelente profesional, responde rápido, asiste personalmente al cliente, súper recomendable.",
                rating: 5,
                image: "https://lh3.googleusercontent.com/a-/ALV-UjXhkIGRisMqIo2Akr-PO1AfDJZzaO5ARAcU0S39V8eGJtLgIg0FDQ=w72-h72-p-rp-mo-br100",
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <div className="relative rounded-2xl bg-white p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-8 h-8 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <blockquote className="text-neutral-700 leading-relaxed mb-6 relative z-10">
                    "{t.text}"
                  </blockquote>
                  
                  {/* Author info */}
                  <footer className="flex items-center gap-3">
                    {t.image ? (
                      <img 
                        src={t.image} 
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[var(--gold)]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-yellow-600 flex items-center justify-center text-white font-semibold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-neutral-900">{t.name}</div>
                      <div className="text-sm text-neutral-500">Cliente satisfecho</div>
                    </div>
                  </footer>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--gold)] to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-8 text-center max-w-2xl mx-auto">
            Las opiniones son ilustrativas. El resultado de un caso depende de sus circunstancias particulares.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">Preguntas frecuentes</h2>
          </div>
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
            cityText="Bahía Blanca"
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
                    className="mt-1 w-full min-h-[120px] max-h-[300px] rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] resize-y"
                    placeholder="Contanos brevemente tu consulta"
                    maxLength={500}
                  />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl text-white px-5 py-2.5 font-medium shadow hover:opacity-95"
                    style={{ backgroundColor: 'rgb(32, 39, 60)' }}
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
{/* FOOTER MEJORADO */}
<footer className="relative overflow-hidden">
  {/* Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[var(--navy)] to-slate-800"></div>
  
  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}></div>
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4 md:px-8">
    {/* Main Content */}
    <div className="py-16 grid lg:grid-cols-12 gap-12">
      
      {/* Logo and Brand Section */}
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex flex-col items-center">
            <div className="size-12 rounded border-2 flex items-center justify-center bg-white border-neutral-300">
              <div className="text-2xl font-serif font-bold text-neutral-700">
                {SITE.initials}
              </div>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-light text-lg text-white drop-shadow-lg">
              {SITE.fullName}
            </div>
          </div>
        </div>
        
        <p className="text-slate-300 leading-relaxed text-lg mb-8 max-w-lg">
          Más de <span className="text-[var(--gold)] font-semibold">15 años</span> de experiencia 
          brindando asesoramiento jurídico especializado con <span className="text-white font-medium">resultados comprobados </span> 
          y atención personalizada.
        </p>
        
        {/* Trust Indicators */}
     {/*    <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-[var(--gold)] mb-1">500+</div>
            <div className="text-sm text-slate-300">Casos Exitosos</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-[var(--gold)] mb-1">24/7</div>
            <div className="text-sm text-slate-300">Disponibilidad</div>
          </div>
        </div> */}
        
        {/* Social Links */}
        <div className="flex gap-3">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center bg-white/10 hover:bg-white/20 w-12 h-12 rounded-xl transition-all duration-300 border border-white/10 hover:border-[var(--gold)]/30"
            title="Instagram"
          >
            <FaInstagram className="text-white group-hover:scale-110 transition-transform" size={20} />
          </a>
          <a
            href={whatsappCTA}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center bg-white/10 hover:bg-white/20 w-12 h-12 rounded-xl transition-all duration-300 border border-white/10 hover:border-[var(--gold)]/30"
            title="WhatsApp"
          >
            <FaWhatsapp className="text-white group-hover:scale-110 transition-transform" size={20} />
          </a>
        </div>
      </div>

      {/* Services and Contact Grid */}
      <div className="lg:col-span-7 grid md:grid-cols-2 gap-12">
        
        {/* Services */}
        <div>
          <h3 className="font-bold text-xl text-white mb-6 relative">
            Áreas de Especialización
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[var(--gold)] mt-2"></div>
          </h3>
          <ul className="space-y-4">
            <li>
              <a href="#servicios" className="group flex items-center gap-3 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" style={{ color: 'oklch(86.9% 0.022 252.894)' }}>
                <div className="size-2 bg-[var(--gold)] rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">Derecho Laboral</span>
              </a>
            </li>
            <li>
              <a href="#servicios" className="group flex items-center gap-3 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" style={{ color: 'oklch(86.9% 0.022 252.894)' }}>
                <div className="size-2 bg-[var(--gold)] rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">Civil y Comercial</span>
              </a>
            </li>
            <li>
              <a href="#servicios" className="group flex items-center gap-3 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" style={{ color: 'oklch(86.9% 0.022 252.894)' }}>
                <div className="size-2 bg-[var(--gold)] rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">Derecho de Familia</span>
              </a>
            </li>
            <li>
              <a href="#contacto" className="group flex items-center gap-3 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" style={{ color: 'oklch(86.9% 0.022 252.894)' }}>
                <div className="size-2 bg-[var(--gold)] rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">Asesorías Urgentes</span>
              </a>
            </li>
          </ul>
          
          {/* Quick CTA */}
       {/*    <div className="mt-8 p-4 bg-gradient-to-r from-[var(--gold)]/10 to-yellow-600/10 rounded-xl border border-[var(--gold)]/20">
            <p className="text-sm text-slate-300 mb-3">¿Necesitas asesoramiento urgente?</p>
            <a href="#contacto" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-yellow-400 font-semibold text-sm transition-colors">
              Consulta Gratuita
              <ArrowRight className="size-4" />
            </a>
          </div> */}
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-bold text-xl text-white mb-6 relative">
            Información de Contacto
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-[var(--gold)] mt-2"></div>
          </h3>
          <div className="space-y-5">
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="p-2 bg-[var(--gold)]/20 rounded-lg">
                <MapPin className="size-5 text-[var(--gold)]" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Oficina Principal</p>
                <p className="text-slate-300 text-sm leading-relaxed">{SITE.address}</p>
              </div>
            </div>
            
            {SITE.email && (
              <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="p-2 bg-[var(--gold)]/20 rounded-lg">
                  <Mail className="size-5 text-[var(--gold)]" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-slate-300 hover:text-[var(--gold)] transition-colors text-sm">
                    {SITE.email}
                  </a>
                </div>
              </div>
            )}
            
            {SITE.phone && (
              <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="p-2 bg-[var(--gold)]/20 rounded-lg">
                  <Phone className="size-5 text-[var(--gold)]" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Teléfono</p>
                  <a href={`tel:${SITE.phone}`} className="text-slate-300 hover:text-[var(--gold)] transition-colors text-sm">
                    {SITE.phone}
                  </a>
                </div>
              </div>
            )}
            
            {/* Office Hours */}
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="p-2 bg-[var(--gold)]/20 rounded-lg">
                <Clock className="size-5 text-[var(--gold)]" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Horarios</p>
                <p className="text-slate-300 text-sm">Lun - Vie: 9:00 - 18:00</p>
                <p className="text-slate-300 text-sm">Sáb: 9:00 - 13:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-white/10 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
           <div className="text-slate-400 text-center w-full">
             © {new Date().getFullYear()} {SITE.fullName}. Todos los derechos reservados.
           </div>
        {/*   <div className="flex items-center gap-4 text-slate-500">
            <span>•</span>
            <span>Matrícula Profesional N° 12345</span>
            <span>•</span>
            <span>Colegio de Abogados</span>
          </div> */}
        </div>
        
        {/* Navigation Links */}
       {/*  <nav className="flex flex-wrap justify-center gap-8 text-sm">
          <a href="#inicio" className="text-slate-400 hover:text-[var(--gold)] transition-colors font-medium">Inicio</a>
          <a href="#servicios" className="text-slate-400 hover:text-[var(--gold)] transition-colors font-medium">Servicios</a>
          <a href="#abogado" className="text-slate-400 hover:text-[var(--gold)] transition-colors font-medium">Perfil</a>
          <a href="#contacto" className="text-slate-400 hover:text-[var(--gold)] transition-colors font-medium">Contacto</a>
        </nav> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
