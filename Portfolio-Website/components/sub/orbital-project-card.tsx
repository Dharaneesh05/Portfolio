"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

type OrbitalProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    image: string;
    tech: readonly string[];
    demo: string;
    github: string;
  };
  position: {
    x: MotionValue<number>;
    z: MotionValue<number>;
    scale: MotionValue<number>;
    opacity: MotionValue<number>;
    rotateY: MotionValue<number>;
    zIndex: MotionValue<number>;
  };
  isActive: boolean;
  onClick: () => void;
};

export const OrbitalProjectCard = ({
  project,
  position,
  isActive,
  onClick,
}: OrbitalProjectCardProps) => {
  return (
    <motion.div
      style={{
        x: position.x,
        y: 0,
        z: position.z,
        scale: position.scale,
        opacity: position.opacity,
        rotateY: position.rotateY,
        zIndex: isActive ? 60 : position.zIndex,
        transformStyle: "preserve-3d",
      }}
      className="absolute cursor-pointer"
      onClick={onClick}
      whileHover={!isActive ? { y: -8 } : {}}
      role="button"
      aria-label={`Select ${project.title}`}
    >
      <motion.div
        animate={{
          width: isActive ? "clamp(280px, 85vw, 360px)" : "clamp(200px, 60vw, 260px)",
          height: isActive ? "clamp(160px, 50vw, 210px)" : "clamp(120px, 35vw, 150px)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
        }}
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
          isActive
            ? "border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "border border-[#27272A] shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:border-[#3F3F46]"
        }`}
        style={{
          background: "#18181B",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-left-top"
          sizes="(max-width: 768px) 280px, 380px"
          priority={isActive}
        />
        {/* Subtle dark overlay for non-active cards to push them back visually */}
        {!isActive && (
          <div className="absolute inset-0 bg-black/60 transition-opacity hover:opacity-40" />
        )}
      </motion.div>
    </motion.div>
  );
};
