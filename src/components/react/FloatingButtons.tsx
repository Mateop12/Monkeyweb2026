import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import homeData from '../../content/landing/home.json';

const phone = (homeData as { whatsappPhone?: string }).whatsappPhone ?? '573000000000';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  // Show "Scroll to Top" button when user scrolls down 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const whatsappMessage = "Hola! Estoy interesado en construir software a medida con Monkeymind.";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed z-50 flex flex-col items-center gap-3 sm:gap-4"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
    >
      
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-alt border border-brand-beige text-brand-petroleum hover:text-brand-turquoise hover:border-brand-turquoise shadow-lg transition-colors focus:outline-none"
            aria-label="Volver arriba"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] focus:outline-none overflow-hidden relative group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 block">
          <path d="M11.97 2C6.446 2 1.96 6.486 1.96 12.01c0 1.98.535 3.905 1.55 5.59L2 22l4.52-1.18c1.64.95 3.51 1.45 5.45 1.45 5.524 0 10.01-4.486 10.01-10.01C21.98 6.486 17.494 2 11.97 2zm0 18.59c-1.68 0-3.32-.45-4.76-1.31l-.34-.2-3.53.93.94-3.44-.22-.35a8.216 8.216 0 01-1.28-4.43c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.51-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-1.07-.53-2.19-1.33-3.03-2.31-.26-.3-.52-.75-.32-.98.11-.13.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.28 3.78 1.42.61 2.11.75 2.87.64.67-.1 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.08-.12-.25-.19-.5-.31z"/>
        </svg>
      </motion.a>
    </div>
  );
}
