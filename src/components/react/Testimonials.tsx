import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface Testimonial {
  content: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    })
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
    <section className="py-24 px-6 bg-bg-main relative z-10 overflow-hidden" aria-labelledby="testimonials-heading">
      
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-turquoise/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-beige/20 rounded-full blur-[120px] pointer-events-none translate-y-1/4 translate-x-1/4"></div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <span className="text-brand-turquoise font-semibold tracking-wider uppercase text-sm">Testimonios</span>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-heading font-bold text-brand-petroleum max-w-2xl">
            Lo que dicen quienes ya escalaron.
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl min-h-[400px] flex items-center justify-center">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="active"
              exit="exit"
              className="absolute w-full px-4"
            >
              <div className="bg-white dark:bg-bg-alt border border-brand-beige p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative">
                
                {/* Quotation Mark Icon */}
                <svg className="absolute top-8 left-8 w-16 h-16 text-brand-turquoise/10 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>

                <div className="relative z-10 flex flex-col gap-8 md:gap-10">
                  <p className="text-xl md:text-3xl font-heading font-medium text-brand-petroleum leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-brand-beige/50 pt-8 mt-2">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-brand-petroleum text-brand-beige flex items-center justify-center font-heading font-bold text-xl shadow-lg">
                        {testimonials[currentIndex].initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-lg text-brand-petroleum">{testimonials[currentIndex].name}</span>
                        <span className="text-sm text-brand-turquoise font-medium">{testimonials[currentIndex].role} — {testimonials[currentIndex].company}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-24 md:-bottom-20 flex items-center justify-center gap-6 w-full z-20">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white dark:bg-[#0e1507] border border-brand-beige flex items-center justify-center text-brand-petroleum hover:text-brand-turquoise hover:border-brand-turquoise hover:scale-110 transition-all shadow-md focus:outline-none"
              aria-label="Testimonio anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-turquoise' : 'w-2.5 bg-brand-beige hover:bg-brand-petroleum/40'}`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white dark:bg-[#0e1507] border border-brand-beige flex items-center justify-center text-brand-petroleum hover:text-brand-turquoise hover:border-brand-turquoise hover:scale-110 transition-all shadow-md focus:outline-none"
              aria-label="Siguiente testimonio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
