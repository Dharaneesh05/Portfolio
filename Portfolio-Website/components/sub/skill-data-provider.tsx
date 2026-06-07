"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

type SkillProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
  color?: string;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
  color = "168,85,247",
}: SkillProps) => {
  const [active, setActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Detect touch device once on mount
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  // Dismiss tooltip on scroll
  const dismiss = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active) return;

    const handleScroll = () => dismiss();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, dismiss]);

  // Dismiss tooltip when Skills section leaves viewport
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) dismiss();
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [dismiss]);

  // Close tap tooltip when clicking outside
  useEffect(() => {
    if (!active || !isTouchDevice) return;

    const handleOutside = (e: TouchEvent | MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        dismiss();
      }
    };

    document.addEventListener("touchstart", handleOutside, { passive: true });
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [active, isTouchDevice, dismiss]);

  // --- Event handlers ---
  const handleHoverStart = () => {
    if (!isTouchDevice) setActive(true);
  };
  const handleHoverEnd = () => {
    if (!isTouchDevice) setActive(false);
  };
  const handleTap = () => {
    if (isTouchDevice) setActive((prev) => !prev);
  };

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="flex items-center justify-center"
      style={{ overflow: "visible" }}
    >
      {/* Icon — positioning context for tooltip */}
      <div className="relative flex items-center justify-center" style={{ overflow: "visible" }}>

        {/* Glassmorphism Tooltip — always above this icon */}
        <AnimatePresence>
          {active && (
            <motion.span
              key="tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.95, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 6, scale: 0.95, x: "-50%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-hidden="true"
              className={[
                "absolute z-[300]",
                "bottom-full mb-2",
                "left-1/2",
                "bg-[#18181B]/90 backdrop-blur-md",
                "border border-[#3F3F46] shadow-xl",
                "text-[#FAFAFA] text-xs font-semibold",
                "px-3 py-1.5 rounded-lg",
                "pointer-events-none select-none whitespace-nowrap",
              ].join(" ")}
            >
              {name}
              {/* small arrow */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3F3F46]" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          whileHover={!isTouchDevice ? { scale: 1.1 } : {}}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onTap={handleTap}
          className="cursor-pointer relative z-10 flex items-center justify-center p-2 rounded-xl transition-all duration-300"
          style={{
            filter: active
              ? `drop-shadow(0 0 14px rgba(${color}, 0.55))`
              : "drop-shadow(0 0 0px rgba(0,0,0,0))",
          }}
        >
          <Image
            src={`/skills/${src}`}
            alt={name}
            width={width}
            height={height}
            draggable={false}
            className="object-contain w-auto h-auto"
            style={{
              width: `clamp(32px, ${width}px, ${width}px)`,
              height: `clamp(32px, ${height}px, ${height}px)`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
