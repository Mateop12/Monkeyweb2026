import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cloud, Cpu, Smartphone, TrendingUp } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap = {
  Code2,
  Cloud,
  Cpu,
  Smartphone,
  TrendingUp
};

export default function Services({ services }: ServicesProps) {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section id="servicios" className="py-24 px-6 relative z-10 bg-bg-main" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 max-w-3xl"
        >
          <span className="text-brand-turquoise font-semibold tracking-wider uppercase text-sm">Capacidades</span>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-heading font-bold text-brand-petroleum">Soluciones Full-Stack para Empresas Modernas.</h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code2;

            return (
              <motion.div 
                key={index}
                variants={item}
                className="group p-8 rounded-3xl bg-[var(--bg-card)] border border-brand-beige hover:border-brand-turquoise/30 hover:bg-[var(--bg-card-hover)] transition-all duration-500 ease-out hover:-translate-y-2 relative overflow-hidden"
                tabIndex={0}
              >
                {/* Background Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-brand-turquoise/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" aria-hidden="true"></div>
                
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-turquoise/10 border border-brand-turquoise/20 flex items-center justify-center text-brand-turquoise group-hover:scale-110 group-hover:text-brand-teal transition-all duration-500">
                    <IconComponent size={28} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-heading font-bold text-brand-petroleum group-hover:text-brand-teal transition-colors">{service.title}</h3>
                    <p className="text-brand-black/70 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-brand-beige/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-br-3xl" aria-hidden="true"></div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
