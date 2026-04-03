import React, { useCallback, useEffect, useState } from 'react';

const FALLBACK = ['/monkeymind1.webp'];

interface Props {
  images: string[];
  title: string;
}

export default function ProjectCarousel({ images, title }: Props) {
  const slides = images?.length ? images : FALLBACK;
  const [index, setIndex] = useState(0);

  const n = slides.length;
  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + n) % n);
    },
    [n]
  );

  useEffect(() => {
    setIndex(0);
  }, [images.join('|')]);

  useEffect(() => {
    if (n <= 1) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [n, go]);

  return (
    <div
      className="border-brand-beige/50 relative h-48 w-full overflow-hidden border-b dark:border-brand-olive/30"
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Galería del proyecto ${title}`}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out [@media(prefers-reduced-motion:reduce)]:transition-none"
        style={{
          width: `${n * 100}%`,
          transform: `translateX(-${(index * 100) / n}%)`,
        }}
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full shrink-0"
            style={{ width: `${100 / n}%` }}
          >
            <img
              src={src}
              alt={`${title} — imagen ${i + 1} de ${n}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="bg-brand-petroleum/20 dark:bg-brand-black/40 pointer-events-none absolute inset-0 mix-blend-multiply transition-colors duration-500 group-hover:bg-transparent" />
          </div>
        ))}
      </div>

      {n > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pointer-events-auto h-1.5 rounded-full transition-all ${
                  i === index ? 'bg-white w-6 shadow-sm' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="text-brand-petroleum hover:bg-white/90 absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 shadow-md backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
            aria-label="Imagen anterior"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(-1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="text-brand-petroleum hover:bg-white/90 absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 shadow-md backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise"
            aria-label="Imagen siguiente"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
