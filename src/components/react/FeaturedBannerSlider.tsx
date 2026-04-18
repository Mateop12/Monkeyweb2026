import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// SLIDES — Edita cada objeto con tu proyecto real
// ─────────────────────────────────────────────────────────────
interface FeaturedSlide {
  href: string;
  label: string;
  logo: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const SLIDES: FeaturedSlide[] = [
  // ── Slide 1 ──────────────────────────────────────────────
  {
    href: 'https://monkeyrestobar.com/',
    label: 'Ver Monkey Restobar',
    logo: '/logoMonkey.webp',
    badge: 'Proyecto Destacado',
    title: '"Monkey Restobar"',
    description:
      'Software POS con facturación DIAN para restaurantes, bares y negocios gastronómicos en Colombia',
    image: '/logoMonkey.webp',
    imageAlt: 'Imagen Monkey Restobar',
  },
  // ── Slide 2 — edita con tu segundo proyecto ──────────────
  {
    href: '/proyectos',
    label: 'Ver segundo proyecto',
    logo: '/logoMonkey.webp',
    badge: 'Caso de Éxito',
    title: '"API Facturación electrónica"',
    description:
      'API de facturación electrónica con integración DIAN para empresas en Colombia',
    image: '/monkeymind1.webp',
    imageAlt: 'Imagen API Facturación electrónica',
  }
];

// ─────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 4000;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.28, ease: EASE },
  }),
};

export default function FeaturedBannerSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (next: number, d: number) => {
      setDir(d);
      setIdx(((next % total) + total) % total);
    },
    [total]
  );

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(idx + 1, 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [idx, paused, go]);

  const slide = SLIDES[idx];

  return (
    <section
      className="w-full px-6 py-12 bg-bg-alt"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-5xl">

        {/* ── Banner area ── */}
        <div
          className="overflow-hidden rounded-3xl shadow-2xl"
          style={{ minHeight: 160 }}
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.a
              key={idx}
              href={slide.href}
              target={slide.href.startsWith('http') ? '_blank' : undefined}
              rel={slide.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={slide.label}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ display: 'flex', minHeight: 160, textDecoration: 'none' }}
              className="group relative w-full overflow-hidden"
            >
              {/* LEFT — white logo zone */}
              <div className="relative flex w-[22%] shrink-0 flex-col items-center justify-center gap-2 bg-white px-5 py-6">
                {/* dot pattern */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-2 grid grid-cols-4 gap-1 opacity-20"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="block h-1 w-1 rounded-full bg-brand-turquoise" />
                  ))}
                </div>
                {/* logo */}
                <div
                  className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-md"
                  style={{ background: 'linear-gradient(135deg,#062B22,#0B5D5E)' }}
                >
                  <img src={slide.logo} alt="Logo" title={slide.title} className="h-full w-full object-cover" />
                </div>
              </div>

              {/* CENTER — gradient + text */}
              <div
                className="relative flex flex-1 flex-col justify-center gap-3 overflow-hidden px-8 py-7"
                style={{ background: 'linear-gradient(100deg,#034242 0%,#0B5D5E 60%,#1a8a8a 100%)' }}
              >
                {/* ECG line */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 opacity-20"
                  width="340" height="70" viewBox="0 0 340 70" fill="none"
                >
                  <polyline
                    points="0,35 60,35 75,10 90,60 105,5 120,65 135,35 340,35"
                    stroke="#F1DBB2" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>

                <span
                  className="w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(241,219,178,0.15)', color: '#F1DBB2' }}
                >
                  {slide.badge}
                </span>

                <p className="font-heading text-2xl font-extrabold italic leading-tight text-white md:text-3xl">
                  {slide.title}
                </p>

                <p className="text-sm font-medium" style={{ color: 'rgba(241,219,178,0.70)' }}>
                  {slide.description}
                </p>
              </div>

              {/* RIGHT — circular image */}
              <div
                className="relative flex w-[28%] shrink-0 items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(100deg,#1a8a8a 0%,#0B5D5E 100%)' }}
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-xl md:h-36 md:w-36">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    title={slide.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* arrow */}
                <div
                  className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="white"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* ── Navigation controls ── */}
        <div className="mt-4 flex items-center justify-center gap-4">
          {/* Prev */}
          <button
            onClick={() => go(idx - 1, -1)}
            aria-label="Proyecto anterior"
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-brand-petroleum shadow-sm transition-all duration-200 hover:bg-brand-petroleum hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
            style={{ borderColor: 'rgba(6,43,34,0.15)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? 1 : -1)}
                aria-label={`Ir al proyecto ${i + 1}`}
                className="transition-all duration-300 focus:outline-none rounded-full"
                style={{
                  width: i === idx ? 22 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: i === idx ? '#034242' : '#cbd5e1',
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => go(idx + 1, 1)}
            aria-label="Proyecto siguiente"
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-brand-petroleum shadow-sm transition-all duration-200 hover:bg-brand-petroleum hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
            style={{ borderColor: 'rgba(6,43,34,0.15)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 flex justify-center gap-1.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="h-0.5 rounded-full transition-all duration-500"
              style={{
                width: i === idx ? 32 : 16,
                background: i === idx ? '#0B5D5E' : '#e2e8f0',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
