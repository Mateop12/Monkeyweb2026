import React from 'react';

export default function Marquee() {
  return (
    <div className="relative py-12 flex w-full overflow-hidden bg-bg-alt border-y border-brand-beige/50 -rotate-2 scale-110 my-16 z-20 shadow-2xl">
      <div 
        className="flex whitespace-nowrap animate-marquee items-center"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            <span 
              className="text-6xl md:text-8xl font-heading font-extrabold text-transparent"
              style={{ WebkitTextStroke: '2px var(--color-brand-petroleum)' }}
            >
              ¿Qué esperas?
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-turquoise animate-pulse"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
            <span className="text-6xl md:text-8xl font-heading font-extrabold text-brand-petroleum">
              Contáctanos
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-turquoise animate-[spin_4s_linear_infinite]"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
