"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

export const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="w-full pt-8 pb-6 flex flex-col items-center justify-center gap-3 bg-transparent">
        <p className="text-[#52525B] text-sm font-semibold tracking-[0.18em] uppercase select-none">
          Designed.&nbsp; Developed.&nbsp; Deployed.
        </p>
        <p className="text-[#3F3F46] text-xs font-medium tracking-wide select-none">
          © 2025 Dharaneesh C
        </p>
      </footer>

      {/* ── Back to Top ──────────────────────────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            key="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center
              bg-[#18181B]/80 backdrop-blur-md border border-[#3F3F46]
              text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#52525B]
              shadow-[0_4px_20px_rgba(0,0,0,0.5)]
              transition-colors duration-200 cursor-pointer"
          >
            <HiArrowUp className="text-base" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
