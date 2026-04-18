import React from 'react';
import { motion } from 'framer-motion';

interface Ally {
  name: string;
  image: string;
}

interface AliadosSliderProps {
  allies: Ally[];
}

export default function AliadosSlider({ allies }: AliadosSliderProps) {
  // Dulplicate allies for infinite feeling if needed, but for now a nice centered row
  return (
    <section className="w-full py-16 mt-12 border-t border-brand-beige/30">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">Socios Estratégicos</span>
          <h2 className="text-3xl font-heading font-bold text-brand-petroleum">Nuestros Aliados</h2>
        </div>

        <div className="w-full overflow-hidden relative group">
          {/* Subtle gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none"></div>

          <motion.div 
            className="flex items-center gap-20 px-12"
            initial={{ x: 0 }}
            animate={{ x: "-15%" }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
          >
            {allies.map((ally, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, y: -5 }}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 group/item relative"
              >
                <img
                  src={ally.image}
                  alt={`Logo de ${ally.name} — aliado y cliente de Monkeymind (desarrollo de software)`}
                  title={`Aliado Estratégico: ${ally.name}`}
                  className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-60 group-hover/item:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Floating tooltips */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-petroleum text-white text-[10px] rounded-md opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none shadow-lg whitespace-nowrap">
                  {ally.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-brand-petroleum"></div>
                </div>
              </motion.div>
            ))}
            
            {/* Repeat for visual continuity */}
            {allies.map((ally, index) => (
               <motion.div
               key={`rep-${index}`}
               whileHover={{ scale: 1.2, y: -5 }}
               className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 group/item relative"
             >
               <img
                 src={ally.image}
                 alt={`Logo de ${ally.name} — aliado y cliente de Monkeymind (desarrollo de software)`}
                 title={`Aliado Estratégico: ${ally.name}`}
                 className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-60 group-hover/item:opacity-100 transition-opacity"
                 loading="lazy"
                 decoding="async"
               />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-petroleum text-white text-[10px] rounded-md opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none shadow-lg whitespace-nowrap">
                  {ally.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-brand-petroleum"></div>
                </div>
             </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
