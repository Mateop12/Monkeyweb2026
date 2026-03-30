import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export default function Hero({ title, subtitle, ctaText }: HeroProps) {
  const titleWords = title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden" aria-labelledby="hero-title">
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-turquoise/20 bg-brand-turquoise/5 mb-8 animate-[pulse_3s_ease-in-out_infinite]" role="status" aria-label="Anuncio reciente"
        >
          <span className="w-2 h-2 rounded-full bg-brand-caramel" aria-hidden="true"></span>
          <span className="text-sm font-medium text-brand-petroleum/90">Nuevo: Lanzamos nuestro servicio de IA</span>
        </motion.div>

        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="hero-title" 
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-brand-petroleum mb-8 leading-[1.1]"
        >
          <motion.span variants={itemVariants} className="block">{firstWord}</motion.span>
          <motion.span variants={itemVariants} className="block text-gradient pb-2">{restOfTitle}</motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-brand-petroleum/70 max-w-2xl mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#contacto" className="px-8 py-4 rounded-full bg-brand-petroleum hover:bg-brand-teal text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(3,66,66,0.2)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center relative overflow-hidden group" aria-label="Inicia tu proyecto">
            <span className="relative z-10">{ctaText}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </a>
          <a href="/proyectos" className="px-8 py-4 rounded-full text-brand-petroleum font-medium text-lg border border-brand-petroleum/20 hover:border-brand-turquoise hover:bg-brand-turquoise/5 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto text-center justify-center" aria-label="Ver nuestros casos de estudio">
            Ver Proyectos
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </motion.div>

      </div>

      {/* Decorative blur artifacts */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-brand-turquoise/15 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" aria-hidden="true"></div>
      <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-brand-beige/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" aria-hidden="true"></div>
    </section>
  );
}
