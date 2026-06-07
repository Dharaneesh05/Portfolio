"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RxGithubLogo } from "react-icons/rx";
import { HiExternalLink, HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { slideInFromTop } from "@/lib/motion";
import { PROJECTS } from "@/constants";
import { OrbitalProjectCard } from "@/components/sub/orbital-project-card";

/* ── types ────────────────────────────────────────────────────────────── */
type Project = (typeof PROJECTS)[number];

/* ── Compact Project Modal ────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 py-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Ultra-Compact Single View Panel (No Scrollbars) */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[50%] max-w-2xl max-h-[550px] lg:max-h-[600px] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-[201] overflow-hidden flex flex-col"
          style={{
            background: "#18181B",
            border: "1px solid #3F3F46",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] bg-black/40 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all duration-200 shadow-sm"
            aria-label="Close modal"
          >
            <HiX className="text-xl" />
          </button>

          {/* Image with top-left alignment and bottom fade */}
          <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[220px] overflow-hidden shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-left-top"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#18181B] to-transparent pointer-events-none" />
          </div>

          {/* Compact Body Content */}
          <div className="p-4 md:p-6 space-y-4 flex flex-col flex-1">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#FAFAFA] tracking-tight mb-2 leading-none">
                {project.title}
              </h2>
              {/* Short 2-4 line description to avoid long paragraphs */}
              <p className="text-[#A1A1AA] text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech badges */}
            <div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#27272A] text-[#D4D4D8] border border-[#3F3F46]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons pinned to bottom if needed */}
            <div className="flex gap-3 pt-2 mt-auto w-full">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAFAFA] hover:bg-[#E4E4E7] text-[#09090B] text-sm font-semibold rounded-lg transition-all duration-200"
              >
                <HiExternalLink className="text-lg flex-shrink-0" />
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#09090B] hover:bg-[#27272A] text-[#FAFAFA] text-sm font-semibold rounded-lg border border-[#3F3F46] transition-all duration-200"
              >
                <RxGithubLogo className="text-lg flex-shrink-0" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const RADIUS = 420; 
const TOTAL_PROJECTS = PROJECTS.length;
const ANGLE_STEP = (2 * Math.PI) / TOTAL_PROJECTS;

export const Encryption = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const rotation = useMotionValue(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ── Fluid Navigation Logic ──────────────────────────────────────────── */
  const updateActiveIndexFromRotation = (rotVal: number) => {
    const targetIndex = Math.round(-rotVal / ANGLE_STEP);
    const normalizedIndex = ((targetIndex % TOTAL_PROJECTS) + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    if (activeIndex !== normalizedIndex) {
      setActiveIndex(normalizedIndex);
    }
  };

  const handleDrag = (e: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.005);
    updateActiveIndexFromRotation(rotation.get());
  };

  const handleDragEnd = (e: any, info: any) => {
    // Pure momentum scrolling (inertia) that naturally decelerates and settles
    // seamlessly on the nearest project without abrupt snapping.
    animate(rotation, rotation.get() + info.velocity.x * 0.005, {
      type: "inertia",
      velocity: info.velocity.x * 0.005,
      power: 0.8,
      timeConstant: 350,
      modifyTarget: (target) => Math.round(target / ANGLE_STEP) * ANGLE_STEP,
      onUpdate: (latest) => updateActiveIndexFromRotation(latest)
    });
  };

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      // Trackpad scrolling mapped smoothly to rotation
      rotation.set(rotation.get() - (e.deltaX || e.deltaY) * 0.003);
      updateActiveIndexFromRotation(rotation.get());

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        animate(rotation, Math.round(rotation.get() / ANGLE_STEP) * ANGLE_STEP, {
          type: "tween",
          ease: [0.25, 1, 0.5, 1],
          duration: 0.45,
          onUpdate: (latest) => updateActiveIndexFromRotation(latest)
        });
      }, 150);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  const goToIndex = (newIndex: number) => {
    const currentAngle = rotation.get();
    const currentIndex = Math.round(-currentAngle / ANGLE_STEP);
    const currentMod =
      ((currentIndex % TOTAL_PROJECTS) + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    
    let diff = newIndex - currentMod;
    if (diff > TOTAL_PROJECTS / 2) diff -= TOTAL_PROJECTS;
    if (diff < -TOTAL_PROJECTS / 2) diff += TOTAL_PROJECTS;

    const targetIndex = currentIndex + diff;
    
    // Smooth transition lasting ~450ms for elegant arrow navigation
    animate(rotation, -targetIndex * ANGLE_STEP, {
      type: "tween",
      ease: [0.25, 1, 0.5, 1], // Custom smooth ease-out
      duration: 0.45,
      onUpdate: (latest) => updateActiveIndexFromRotation(latest)
    });
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <>
      <section
        id="projects"
        className="relative w-full min-h-[calc(100vh-65px)] flex flex-col items-center justify-center pt-24 pb-20 scroll-mt-[65px] overflow-hidden"
        style={{ background: "#09090B" }}
      >
        {/* ── Heading ────────────────────────────────────────────────────── */}
        <div className="w-full text-center z-10 px-5 mb-2">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromTop}
            className="text-4xl md:text-5xl font-extrabold text-[#FAFAFA] tracking-tight"
          >
            Projects
          </motion.h2>
        </div>

        {/* ── Orbital 3D Carousel ────────────────────────────────────────── */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
          
          <div className="absolute w-64 h-64 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

          {/* Left Arrow */}
          <button
            onClick={() => goToIndex((activeIndex - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS)}
            aria-label="Previous project"
            className="absolute left-2 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 bg-[#18181B]/60 backdrop-blur-md border border-[#3F3F46] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <HiChevronLeft className="text-2xl sm:text-3xl text-[#FAFAFA]" />
          </button>

          {/* Orbit Track */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px] cursor-grab active:cursor-grabbing z-50 touch-pan-y"
          >
            {PROJECTS.map((project, index) => {
              const baseAngle = index * ANGLE_STEP;

              // Dramatic 3D Positioning & Depth Perception
              const x = useTransform(rotation, (r) => Math.sin(baseAngle + r) * RADIUS);
              const z = useTransform(rotation, (r) => Math.cos(baseAngle + r) * RADIUS);
              
              // Map Depth to Scale (Center is huge 1.1x, back is tiny 0.35x)
              const scale = useTransform(z, [-RADIUS, 0, RADIUS], [0.35, 0.7, 1.1]);
              
              // Map Depth to Opacity (Back is heavily faded, side is dim, front is fully solid)
              const opacity = useTransform(z, [-RADIUS, 0, RADIUS], [0.15, 0.5, 1]);
              
              // Map Depth to Blur (Back is blurry, front is razor sharp)
              const blurFilter = useTransform(z, [-RADIUS, 0, RADIUS], ["blur(12px)", "blur(4px)", "blur(0px)"]);
              
              // Strong 3D angling
              const rotateY = useTransform(rotation, (r) => Math.sin(baseAngle + r) * 25);
              const zIndex = useTransform(scale, (s) => Math.floor(s * 100));

              const isCenter = activeIndex === index;

              return (
                <OrbitalProjectCard
                  key={project.id}
                  project={project}
                  position={{ x, z, scale, opacity, rotateY, zIndex, filter: blurFilter }}
                  isActive={isCenter}
                  onClick={() => {
                    if (isCenter) {
                      setShowModal(true);
                    } else {
                      goToIndex(index);
                    }
                  }}
                />
              );
            })}
          </motion.div>

          {/* Right Arrow */}
          <button
            onClick={() => goToIndex((activeIndex + 1) % TOTAL_PROJECTS)}
            aria-label="Next project"
            className="absolute right-2 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 bg-[#18181B]/60 backdrop-blur-md border border-[#3F3F46] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <HiChevronRight className="text-2xl sm:text-3xl text-[#FAFAFA]" />
          </button>
        </div>

        {/* Orbit information text removed completely per user request */}
      </section>

      {/* ── Modal Portal ─────────────────────────────────────────────────── */}
      {showModal && (
        <ProjectModal
          project={activeProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
