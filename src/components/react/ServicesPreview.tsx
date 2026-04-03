import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cloud, Cpu, Smartphone, TrendingUp, ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesPreviewProps {
  services: Service[];
}

const iconMap = { Code2, Cloud, Cpu, Smartphone, TrendingUp };

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  // Show only the first 3 services as a teaser
  const preview = services.slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60 } }
  };

  return (
    <section id="servicios" className="py-24 px-6 relative z-10 bg-bg-main overflow-hidden" aria-labelledby="services-preview-heading">
      
      {/* Background glow */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="flex flex-col gap-3">
            <span className="text-brand-turquoise font-semibold tracking-wider uppercase text-sm">Capacidades</span>
            <h2 id="services-preview-heading" className="text-4xl md:text-5xl font-heading font-bold text-brand-petroleum max-w-xl">
              Soluciones Full-Stack para Empresas Modernas.
            </h2>
          </div>
          <a
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-turquoise hover:text-brand-teal transition-colors whitespace-nowrap shrink-0"
          >
            Ver todos los servicios
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* 3-column preview grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {preview.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code2;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group p-8 rounded-3xl bg-[var(--bg-card)] border border-brand-beige hover:border-brand-turquoise/30 hover:bg-[var(--bg-card-hover)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-turquoise/10 border border-brand-turquoise/20 flex items-center justify-center text-brand-turquoise group-hover:scale-110 transition-transform duration-500">
                    <IconComponent size={28} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-heading font-bold text-brand-petroleum group-hover:text-brand-teal transition-colors">{service.title}</h3>
                    <p className="text-brand-black/70 leading-relaxed text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-brand-turquoise/20 bg-brand-turquoise/5"
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-heading font-bold text-xl text-brand-petroleum">¿Necesitas algo más específico?</span>
            <span className="text-brand-black/60 text-sm">Tenemos más soluciones diseñadas a la medida de tu empresa.</span>
          </div>
          <a
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-petroleum text-white font-semibold text-sm hover:bg-brand-teal hover:shadow-[0_0_24px_rgba(11,93,94,0.3)] transition-all duration-300 hover:-translate-y-0.5 shrink-0"
          >
            Explorar Servicios
            <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
