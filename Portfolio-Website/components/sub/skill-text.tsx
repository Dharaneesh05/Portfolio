"use client";

import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3"
      >
        Skills
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-lg md:text-xl text-[#D4D4D8] font-normal text-center mb-12"
      >
        Technologies I use to build real-world applications
      </motion.div>
    </div>
  );
};
