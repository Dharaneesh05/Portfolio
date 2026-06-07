"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";
import { CERTIFICATIONS, ACHIEVEMENTS } from "@/constants";
import { HiPlus, HiX, HiMinus, HiOutlineExternalLink } from "react-icons/hi";

type ActiveItemType = {
  id: number;
  type: "certification" | "achievement";
};

export const Experience = () => {
  const [activeItem, setActiveItem] = useState<ActiveItemType | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const InteractiveCard = ({ item, type }: { item: any; type: "certification" | "achievement" }) => {
    const isHovered = hoveredId === `${type}-${item.id}`;
    const isActive = activeItem?.id === item.id && activeItem?.type === type;
    const subtitle = type === "certification" ? item.issuer : item.category;

    const handleViewClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveItem({ id: item.id, type });
      setHoveredId(null);
    };

    const handleCloseClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveItem(null);
    };

    return (
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 32 }}
        className={`w-full relative rounded-2xl bg-[#18181B]/80 backdrop-blur-md p-5 sm:p-6 cursor-pointer overflow-hidden border ${
          isActive
            ? "border-[#3F3F46] shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-20"
            : isHovered
            ? "border-[#3F3F46] bg-[#18181B] shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-10"
            : "border-[#27272A]"
        }`}
        style={{ transition: "border-color 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease" }}
        role="button"
        aria-expanded={isActive}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        onMouseEnter={() => {
          if (activeItem && (activeItem.id !== item.id || activeItem.type !== type)) {
            setActiveItem(null);
          }
          if (!isActive) setHoveredId(`${type}-${item.id}`);
        }}
        onMouseLeave={() => {
          if (!isActive) setHoveredId(null);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isActive ? (
            // ──────────────── COLLAPSED / HOVER STATE ────────────────
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex-1 pr-4">
                  <h4 className="text-lg sm:text-xl font-bold text-[#FAFAFA] leading-snug">
                    {item.title}
                  </h4>
                  {subtitle && (
                    <p className="text-[#A1A1AA] text-sm mt-1 font-medium">
                      {subtitle}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end shrink-0 gap-3">
                  <span className="text-xs text-[#FAFAFA] bg-[#27272A] border border-[#3F3F46] px-3 py-1.5 rounded-full whitespace-nowrap font-medium tracking-wide">
                    {item.date}
                  </span>
                  <motion.div
                    className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-400 ${
                      isHovered
                        ? "bg-[#FAFAFA] text-[#09090B]"
                        : "bg-transparent border border-[#3F3F46] text-[#A1A1AA]"
                    }`}
                    aria-hidden="true"
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: isHovered ? 135 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {isHovered ? <HiMinus className="text-lg" /> : <HiPlus className="text-lg" />}
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Hover Expansion Area */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-[#27272A] flex flex-col items-start">
                      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4 pr-4">
                        {item.description}
                      </p>
                      {item.certificateUrl && (
                        <button
                          onClick={handleViewClick}
                          aria-label={type === "certification" ? `View certificate for ${item.title}` : `View proof for ${item.title}`}
                          className="inline-flex items-center gap-2 text-[#60A5FA] text-sm font-semibold hover:text-[#93C5FD] transition-colors"
                        >
                          {type === "certification" ? "View Certificate" : "View Proof"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            // ──────────────── EXPANDED / ACTIVE STATE ────────────────
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col w-full relative"
            >
              <div className="flex items-start justify-between w-full mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] leading-tight pr-8">
                  {item.title}
                </h3>
                <button
                  onClick={handleCloseClick}
                  className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#27272A] border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#3F3F46] transition-all shrink-0"
                >
                  <HiX className="text-sm" />
                </button>
              </div>

              {/* Certificate/Proof Preview Only (No Metadata below it) */}
              {item.certificateUrl && (
                <div className="w-full relative rounded-xl overflow-hidden bg-[#27272A] border border-[#3F3F46]/50 flex items-center justify-center p-2 sm:p-4 min-h-[250px] sm:min-h-[400px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.certificateUrl, "_blank");
                    }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#18181B]/80 backdrop-blur-md border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#3F3F46] hover:scale-110 transition-all z-30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    title="Open in new tab"
                    aria-label={`Open ${item.title} proof in new tab`}
                  >
                    <HiOutlineExternalLink className="text-xl" aria-hidden="true" />
                  </button>
                  {item.certificateUrl.endsWith(".pdf") ? (
                    <iframe
                      src={`${item.certificateUrl}#toolbar=0`}
                      className="w-full h-[300px] sm:h-[400px] rounded-lg bg-white"
                      title={item.title}
                    />
                  ) : (
                    <img
                      src={item.certificateUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto object-contain rounded-lg max-h-[400px]"
                    />
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen flex flex-col items-center justify-start py-20 px-4 sm:px-5 overflow-hidden scroll-mt-[65px]"
    >
      {/* Section Heading */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAFA] text-center mb-12 sm:mb-16 z-10 tracking-tight"
      >
        Experience
      </motion.div>

      {/* Two Column Grid */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 z-10">
        {/* Left Column: Certifications */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA]">
              Certifications
            </h3>
          </div>
          {CERTIFICATIONS.map((cert) => (
            <InteractiveCard key={`cert-${cert.id}`} item={cert} type="certification" />
          ))}
        </motion.div>

        {/* Right Column: Achievements */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA]">
              Achievements
            </h3>
          </div>
          {ACHIEVEMENTS.map((achievement) => (
            <InteractiveCard key={`ach-${achievement.id}`} item={achievement} type="achievement" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
