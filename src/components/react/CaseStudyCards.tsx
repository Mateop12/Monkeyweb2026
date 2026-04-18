import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import ProjectCarousel, { type CarouselSlide } from './ProjectCarousel';

/** Rutas en `public/` (p. ej. /images/proyectos/...). Sitepins puede guardar `{ src, alt? }` por ítem. */
export type ProjectImage = string | { src: string; alt?: string };

export interface CaseStudy {
  id?: string;
  order?: number;
  client: string;
  title: string;
  description: string;
  metric: string;
  functionalities: string[];
  images: ProjectImage[];
}

const FALLBACK_CAROUSEL_SRC = '/monkeymind1.webp';

/** Construye diapositivas con alt descriptivo para SEO y accesibilidad. */
export function normalizeProjectSlides(
  images: ProjectImage[],
  title: string,
  client: string
): CarouselSlide[] {
  type Parsed = { src: string; alt?: string };
  const parsed: Parsed[] = (images ?? [])
    .map((x): Parsed | null => {
      if (typeof x === 'string') {
        const src = x.trim();
        return src ? { src } : null;
      }
      if (x && typeof x === 'object' && typeof (x as { src?: string }).src === 'string') {
        const o = x as { src: string; alt?: string };
        const src = o.src.trim();
        if (!src) return null;
        const altFromCms = typeof o.alt === 'string' ? o.alt.trim() : '';
        return { src, alt: altFromCms || undefined };
      }
      return null;
    })
    .filter((x): x is Parsed => x !== null);

  const n = parsed.length;
  if (n === 0) {
    return [
      {
        src: FALLBACK_CAROUSEL_SRC,
        alt: `Vista ilustrativa del proyecto «${title}» para ${client} — desarrollo Monkeymind, Colombia.`,
      },
    ];
  }

  return parsed.map((item, i) => ({
    src: item.src,
    alt:
      item.alt ||
      `${client} — «${title}»: captura ${i + 1} de ${n}. Caso de éxito desarrollado por Monkeymind.`,
  }));
}

/** Acepta string[] o listas guardadas por Sitepins como { value } / { item }. */
function normalizeFunctionalities(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => {
      if (typeof x === 'string') return x;
      if (x && typeof x === 'object') {
        const o = x as Record<string, unknown>;
        if (typeof o.value === 'string') return o.value;
        if (typeof o.item === 'string') return o.item;
      }
      return '';
    })
    .filter(Boolean);
}

interface Props {
  caseStudies: CaseStudy[];
  whatsappPhone: string;
  /** Si se define, muestra un CTA bajo la rejilla (p. ej. enlace a /proyectos). */
  moreProjectsHref?: string;
}

function buildWhatsAppUrl(phone: string, title: string, client: string) {
  const text = `Hola, me interesa conocer más sobre el proyecto "${title}" (${client}). ¿Podemos hablar?`;
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export default function CaseStudyCards({ caseStudies, whatsappPhone, moreProjectsHref }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  const active = openIndex !== null ? caseStudies[openIndex] : null;

  return (
    <section
      id="work"
      className="relative z-10 border-y border-brand-beige/50 bg-bg-alt px-6 py-24"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-brand-turquoise text-sm font-semibold uppercase tracking-wider">Nuestro Trabajo</span>
          <h2 id="work-heading" className="font-heading text-brand-petroleum max-w-2xl text-4xl font-bold md:text-5xl">
            Impacto probado en múltiples industrias.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {caseStudies.map((study, idx) => (
            <article
              key={study.id ?? `${study.client}-${idx}`}
              className="group border-brand-beige bg-white dark:bg-bg-alt relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:border-brand-turquoise/40 hover:shadow-xl dark:border-brand-olive/40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-brand-turquoise/10 via-transparent to-transparent" />

              <ProjectCarousel
                slides={normalizeProjectSlides(study.images, study.title, study.client)}
                title={study.title}
              />

              <div className="relative z-10 flex flex-grow flex-col bg-white p-8 dark:bg-bg-alt">
                <span className="text-brand-caramel mb-3 block text-xs font-semibold uppercase">{study.client}</span>
                <h3 className="font-heading text-brand-petroleum group-hover:text-brand-teal mb-4 line-clamp-2 text-2xl font-bold transition-colors">
                  {study.title}
                </h3>
                <p className="text-brand-black/75 mb-8 flex-grow">{study.description}</p>

                <div className="border-brand-beige flex flex-col gap-4 border-t pt-6 dark:border-brand-olive/30 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-brand-teal flex items-center gap-2 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    {study.metric}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      className="font-heading border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2"
                      onClick={() => setOpenIndex(idx)}
                    >
                      Ver más
                    </button>
                    <a
                      href={buildWhatsAppUrl(whatsappPhone, study.title, study.client)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      Contacto
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {moreProjectsHref ? (
          <div className="flex justify-center pt-2">
            <a
              href={moreProjectsHref}
              className="font-heading bg-brand-petroleum text-white hover:bg-brand-teal inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 dark:bg-brand-beige dark:text-brand-petroleum dark:hover:bg-brand-caramel"
            >
              Ver más proyectos
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        ) : null}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && active ? (
              <motion.div
                key={`case-modal-${openIndex}`}
                role="presentation"
                className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-brand-petroleum/60 backdrop-blur-sm dark:bg-black/70"
                  aria-label="Cerrar ventana"
                  onClick={() => setOpenIndex(null)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="case-modal-title"
                  className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-brand-beige bg-[var(--bg-card)] shadow-2xl dark:border-brand-olive/40"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-brand-beige/80 p-6 dark:border-brand-olive/30">
                    <div>
                      <p className="text-brand-caramel mb-1 text-xs font-semibold uppercase tracking-wide">
                        {active.client}
                      </p>
                      <h3
                        id="case-modal-title"
                        className="font-heading text-brand-petroleum text-xl font-bold leading-tight sm:text-2xl"
                      >
                        {active.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="text-brand-black/50 hover:text-brand-petroleum dark:hover:text-brand-beige -m-2 shrink-0 rounded-full p-2 transition-colors"
                      onClick={() => setOpenIndex(null)}
                      aria-label="Cerrar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    <p className="text-brand-turquoise mb-3 text-sm font-semibold uppercase tracking-wider">
                      Funcionalidades
                    </p>
                    <ul className="text-brand-black/85 space-y-3 text-sm leading-relaxed sm:text-base" role="list">
                      {(normalizeFunctionalities(active.functionalities).length
                        ? normalizeFunctionalities(active.functionalities)
                        : ['Detalles disponibles bajo solicitud.']
                      ).map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-brand-turquoise mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-turquoise" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-brand-beige/80 p-6 dark:border-brand-olive/30 sm:flex-row sm:justify-end">
                    <a
                      href={buildWhatsAppUrl(whatsappPhone, active.title, active.client)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M11.97 2C6.446 2 1.96 6.486 1.96 12.01c0 1.98.535 3.905 1.55 5.59L2 22l4.52-1.18c1.64.95 3.51 1.45 5.45 1.45 5.524 0 10.01-4.486 10.01-10.01C21.98 6.486 17.494 2 11.97 2zm0 18.59c-1.68 0-3.32-.45-4.76-1.31l-.34-.2-3.53.93.94-3.44-.22-.35a8.216 8.216 0 01-1.28-4.43c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.51-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-1.07-.53-2.19-1.33-3.03-2.31-.26-.3-.52-.75-.32-.98.11-.13.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.28 3.78 1.42.61 2.11.75 2.87.64.67-.1 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.08-.12-.25-.19-.5-.31z" />
                      </svg>
                      Contactar por WhatsApp
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-brand-beige px-5 py-3 text-sm font-semibold text-brand-petroleum transition-colors hover:bg-brand-beige/30 dark:border-brand-olive dark:text-brand-beige dark:hover:bg-brand-olive/40"
                      onClick={() => setOpenIndex(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
