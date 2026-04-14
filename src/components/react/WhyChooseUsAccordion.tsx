import React, { useId, useState } from 'react';

export interface WhyChooseItem {
  title: string;
  body: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  items: WhyChooseItem[];
}

export default function WhyChooseUsAccordion({ eyebrow, heading, items }: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section className="w-full" aria-labelledby={`${baseId}-heading`}>
      <p className="text-brand-turquoise mb-4 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm">
        {eyebrow}
      </p>
      <h2
        id={`${baseId}-heading`}
        className="font-heading text-brand-petroleum text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
      >
        {heading}
      </h2>

      <div className="border-brand-beige/80 mt-12 border-t dark:border-brand-olive/40" role="list">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          const headerId = `${baseId}-header-${i}`;

          return (
            <div
              key={i}
              className="border-brand-beige/80 border-b dark:border-brand-olive/35"
              role="listitem"
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={headerId}
                  className="text-brand-petroleum hover:text-brand-teal focus-visible:ring-brand-turquoise flex w-full items-start justify-between gap-4 py-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main dark:focus-visible:ring-offset-bg-main"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="font-heading text-lg font-bold sm:text-xl md:text-2xl">{item.title}</span>
                  <span
                    className="border-brand-turquoise/40 bg-brand-turquoise/10 text-brand-turquoise mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-colors dark:bg-brand-turquoise/15"
                    aria-hidden
                  >
                    {isOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-brand-black/80 dark:text-brand-black/75 max-w-3xl pb-6 text-base leading-relaxed sm:text-lg">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
