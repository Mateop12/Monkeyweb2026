import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface Testimonial {
  content: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  /** Ruta pública (ej. /images/testimonios/persona.webp) desde Sitepins / CMS */
  photo?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    active: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 32,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section
      className="bg-bg-main relative z-10 overflow-hidden px-4 pb-28 pt-16 sm:px-6 sm:pb-24 sm:pt-24 md:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-turquoise/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-brand-beige/20 blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-1 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex w-full flex-col items-center gap-4 px-1 text-center sm:mb-16 sm:px-0"
        >
          <span className="text-brand-turquoise text-sm font-semibold tracking-wider uppercase">Testimonios</span>
          <h2
            id="testimonials-heading"
            className="font-heading text-brand-petroleum w-full max-w-2xl text-3xl font-bold sm:text-4xl md:mb-2 md:text-5xl"
          >
            Lo que dicen nuestros clientes.
          </h2>
        </motion.div>

        <div className="relative mx-auto w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="active"
                exit="exit"
                className="w-full"
              >
                <div className="relative rounded-[2rem] border border-brand-beige bg-white p-6 text-center shadow-2xl sm:rounded-[2.5rem] sm:p-10 sm:text-left md:p-14 dark:bg-bg-alt">
                  <svg
                    className="text-brand-turquoise/10 absolute top-4 left-1/2 h-10 w-10 -translate-x-1/2 rotate-180 sm:left-8 sm:translate-x-0 sm:top-8 sm:h-16 sm:w-16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <div className="relative z-10 flex flex-col gap-6 pt-10 sm:gap-8 sm:pt-2 md:gap-10">
                    <p className="font-heading text-brand-petroleum text-lg leading-relaxed font-medium sm:text-left sm:text-xl md:text-2xl lg:text-3xl">
                      &ldquo;{testimonials[currentIndex].content}&rdquo;
                    </p>

                    <div className="flex flex-col items-center gap-4 border-t border-brand-beige/50 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8">
                      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5 sm:text-left">
                        {testimonials[currentIndex].photo?.trim() ? (
                          <img
                            src={testimonials[currentIndex].photo!.trim()}
                            alt={`Retrato de ${testimonials[currentIndex].name}, ${testimonials[currentIndex].role} en ${testimonials[currentIndex].company} — testimonio Monkeymind`}
                            title={`Testimonio de ${testimonials[currentIndex].name}`}
                            className="h-12 w-12 shrink-0 rounded-full border border-brand-beige/40 object-cover shadow-lg sm:h-14 sm:w-14"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="font-heading text-brand-beige flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-petroleum text-lg font-bold shadow-lg sm:h-14 sm:w-14 sm:text-xl">
                            {testimonials[currentIndex].initials}
                          </div>
                        )}
                        <div className="flex min-w-0 flex-col items-center sm:items-start">
                          <span className="font-heading text-brand-petroleum text-base font-bold sm:text-lg">
                            {testimonials[currentIndex].name}
                          </span>
                          <span className="text-brand-turquoise text-center text-sm font-medium sm:text-left">
                            {testimonials[currentIndex].role} — {testimonials[currentIndex].company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles fuera del flujo absoluto del slide: siempre debajo de la tarjeta */}
          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-6">
            <button
              type="button"
              onClick={prevSlide}
              className="border-brand-beige text-brand-petroleum hover:border-brand-turquoise hover:text-brand-turquoise flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white shadow-md transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise sm:h-14 sm:w-14 dark:bg-[#0e1507]"
              aria-label="Testimonio anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex max-w-[min(100%,12rem)] flex-wrap items-center justify-center gap-2 px-1">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-brand-turquoise w-8' : 'bg-brand-beige hover:bg-brand-petroleum/40 w-2.5'
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="border-brand-beige text-brand-petroleum hover:border-brand-turquoise hover:text-brand-turquoise flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white shadow-md transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise sm:h-14 sm:w-14 dark:bg-[#0e1507]"
              aria-label="Siguiente testimonio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
