"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { SiLeetcode } from "react-icons/si";

export const About = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const aboutText = "I am a MERN Stack and AI Developer focused on building scalable web applications and AI-driven solutions that solve real-world problems. Currently pursuing Artificial Intelligence & Data Science at Kongu Engineering College, I actively enhance my expertise through projects, hackathons, certifications, and continuous learning. I enjoy combining clean code, modern technologies, and user-centric design to create reliable, impactful, and innovative digital experiences while continuously exploring emerging tools and industry best practices for meaningful innovation.";

  const [displayedText, setDisplayedText] = useState("");
  const hasTyped = useRef(false);

  useEffect(() => {
    if (isInView && !hasTyped.current) {
      hasTyped.current = true;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < aboutText.length) {
          setDisplayedText(aboutText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 15); // Fast, snappy typing speed
      return () => clearInterval(typingInterval);
    }
  }, [isInView, aboutText]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[calc(100vh-65px)] pt-[115px] pb-8 md:pb-10 overflow-hidden scroll-mt-[65px]"
      id="about-me"
    >
      <div className="relative mx-auto max-w-5xl px-5 md:px-6">
        {/* Top centered heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-[#FAFAFA] text-center mb-4 md:mb-5"
        >
          About Me
        </motion.h2>

        <motion.div
          className="flex flex-col gap-4 md:gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Full-width Premium Developer Terminal */}
          <div className="w-full">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                },
              }}
              className="relative w-full"
            >
              <div className="relative bg-[#09090B]/80 backdrop-blur-md border border-[#3F3F46] rounded-xl px-5 md:px-6 pt-3 md:pt-4 pb-4 md:pb-5 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#3F3F46]/50" aria-hidden="true">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]/80 border border-white/10" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]/80 border border-white/10" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]/80 border border-white/10" />
                  </div>
                  <span className="text-xs text-[#71717A] ml-3 font-mono uppercase tracking-wider font-semibold">
                    terminal
                  </span>
                </div>

                {/* Code lines */}
                <div className="font-mono font-semibold" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", textAlign: "justify", textAlignLast: "left" }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <span className="text-[#D4D4D8] leading-relaxed md:leading-relaxed break-words">
                      {displayedText}
                    </span>
                    <motion.span
                      className="inline-block w-2.5 h-5 bg-[#FAFAFA] ml-1.5 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social glass cards below in a responsive row */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.7, duration: 0.5 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full"
          >
            {[
              {
                label: "GitHub",
                sub: "Showcasing full-stack development, AI projects, and open-source contributions.",
                href: "https://github.com/Dharaneesh05",
                Icon: RxGithubLogo,
                stats: "Projects • Innovation • Development",
              },
              {
                label: "LinkedIn",
                sub: "Professional profile, academic achievements, and career growth.",
                href: "https://www.linkedin.com/in/dharaneesh-c/",
                Icon: RxLinkedinLogo,
                stats: "Learning • Networking • Growth",
              },
              {
                label: "LeetCode",
                sub: "Strengthening problem-solving skills through consistent coding practice.",
                href: "https://leetcode.com/u/DharaneeshC/",
                Icon: SiLeetcode,
                stats: "Practice • Improve • Repeat",
              },
            ].map(({ label, sub, href, Icon, stats }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={`Visit my ${label} profile`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-sweep-card group relative w-full flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="border border-[#3F3F46] bg-[#18181B] p-3 md:p-4 rounded-xl cursor-pointer relative overflow-hidden flex flex-col flex-1 transition-all duration-300 group-hover:border-[#52525B] shadow-sm">
                  
                  {/* Subtle silver light sweep animation on hover */}
                  <div className="sweep-layer absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent -translate-x-[150%] pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className="text-2xl text-[#71717A] group-hover:text-[#FAFAFA] transition-colors duration-300" />
                          <div className="text-[#FAFAFA] font-semibold text-base">{label}</div>
                        </div>
                        <svg className="w-4 h-4 text-[#3F3F46] group-hover:text-[#D4D4D8] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      
                      {/* Body */}
                      <div className="text-[#D4D4D8] text-sm mb-3 leading-snug">
                        {sub}
                      </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="text-xs text-[#52525B] group-hover:text-[#A1A1AA] transition-colors duration-300 border-t border-[#3F3F46]/60 pt-2 font-medium tracking-wide">
                      {stats}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};
