"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { slideInFromTop } from "@/lib/motion";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const heading = (el.querySelector('h1, h2, h3') as HTMLElement | null) ?? el;
  const top = heading.getBoundingClientRect().top + window.scrollY - 65 - 10;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

/* ── Roles that cycle beneath the name ─────────────────────────────── */
const ROLES = [
  "Full-Stack Developer",
  "AI Developer",
  "MERN Stack Developer",
  "Machine Learning Enthusiast",
  "Data Analytics Practitioner",
];

/* ── Fade-only animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const HeroContent = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Hero Shell ─────────────────────────────────────────────── */}
      <section aria-label="Hero Introduction" className="relative w-full min-h-[calc(100vh-65px)] flex items-center justify-center px-5">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center w-full max-w-3xl gap-0 py-16 pt-24"
        >

          {/* 1 ▸ I'M label */}
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-[#52525B] font-extrabold tracking-[0.4em] uppercase mb-4"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
          >
            I&apos;M
          </motion.p>

          {/* 2 ▸ Name */}
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-extrabold text-[#FAFAFA] leading-none tracking-tight mb-8 whitespace-nowrap"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
          >
            Dharaneesh C
          </motion.h1>

          {/* 3 ▸ Tagline / Description */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="flex flex-col gap-2 mb-8"
          >
            <p className="text-[#A1A1AA] font-normal leading-relaxed max-w-[650px] mx-auto" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)" }}>
              Building modern web experiences with purpose and precision.
            </p>
            <p className="text-[#A1A1AA] font-normal leading-relaxed max-w-[650px] mx-auto" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)" }}>
              Focused on creating scalable, intelligent, and user-centric digital solutions.
            </p>
          </motion.div>

          {/* 4 ▸ Animated Role Rotator */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="mb-12"
            style={{ height: "clamp(2rem, 3vw, 2.5rem)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                className="block font-bold text-[#D4D4D8]"
                style={{ fontSize: "clamp(1.3rem, 2vw, 2rem)" }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* 5 ▸ CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary — View Resume */}
            <button
              onClick={() => setShowPDF(true)}
              className="py-3 px-8 button-primary text-center cursor-pointer rounded-lg font-semibold text-sm tracking-wide min-w-[160px]"
            >
              View Resume
            </button>

            {/* Secondary — Get In Touch */}
            <button
              onClick={() => scrollTo('contact')}
              className="py-3 px-8 text-center text-[#FAFAFA] cursor-pointer rounded-lg font-semibold text-sm tracking-wide border border-[#3F3F46] hover:border-[#52525B] hover:bg-white/[0.03] transition-all duration-200 min-w-[160px]"
            >
              Get In Touch
            </button>
          </motion.div>

        </motion.div>
      </section>

      {/* ── PDF Modal ──────────────────────────────────────────────── */}
      {showPDF && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowPDF(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Resume Document Viewer"
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPDF(false)}
              className="absolute top-4 right-4 z-10 bg-[#18181B] hover:bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all font-bold text-xl"
              aria-label="Close Resume"
              title="Close"
            >
              ✕
            </button>
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume - Dharaneesh C"
            />
          </div>
        </div>
      )}
    </>
  );
};
