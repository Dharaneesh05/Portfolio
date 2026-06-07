"use client";

import { motion } from "framer-motion";
import { SkillDataProvider } from "@/components/sub/skill-data-provider";

const FULL_STACK_ROW = [
  // Frontend
  { skill_name: "HTML5",       image: "html.png",       width: 44, height: 44, color: "227,76,38"  },
  { skill_name: "CSS3",        image: "css.png",        width: 44, height: 44, color: "38,77,228"  },
  { skill_name: "Tailwind CSS",image: "tailwind.png",   width: 44, height: 44, color: "56,189,248" },
  { skill_name: "React.js",    image: "react.png",      width: 44, height: 44, color: "97,218,251" },
  { skill_name: "Next.js",     image: "next.png",       width: 44, height: 44, color: "255,255,255"},
  // Backend
  { skill_name: "Node.js",     image: "node.png",       width: 44, height: 44, color: "102,159,99" },
  { skill_name: "Express.js",  image: "express.png",    width: 44, height: 44, color: "255,255,255"},
  { skill_name: "Firebase",    image: "firebase.png",   width: 44, height: 44, color: "255,202,40" },
  { skill_name: "Spring Boot", image: "spring.svg",     width: 44, height: 44, color: "109,179,63" },
  // Database
  { skill_name: "MongoDB",     image: "mongodb.png",    width: 44, height: 44, color: "67,153,52"  },
  { skill_name: "MySQL",       image: "mysql.png",      width: 44, height: 44, color: "0,117,143"  },
  { skill_name: "Redis",       image: "redis.svg",      width: 44, height: 44, color: "220,56,45"  },
];

const PROGRAMMING_LANGUAGES = [
  { skill_name: "Python",     image: "python.svg", width: 48, height: 48, color: "55,118,171"  },
  { skill_name: "Java",       image: "java.svg",   width: 48, height: 48, color: "237,139,0"   },
  { skill_name: "JavaScript", image: "js.png",     width: 48, height: 48, color: "247,223,30"  },
  { skill_name: "TypeScript", image: "ts.png",     width: 48, height: 48, color: "49,120,198"  },
];

const AI_ML = [
  { skill_name: "Scikit-Learn",image: "scikit.svg",     width: 48, height: 48, color: "247,147,30" },
  { skill_name: "TensorFlow",  image: "tensorflow.svg", width: 48, height: 48, color: "255,111,0"  },
  { skill_name: "OpenCV",      image: "opencv.svg",     width: 48, height: 48, color: "92,62,232"  },
  { skill_name: "Pandas",      image: "pandas.svg",     width: 48, height: 48, color: "21,4,88"    },
];

const TOOLS = [
  { skill_name: "Git",      image: "git.png",      width: 48, height: 48, color: "240,80,50"  },
  { skill_name: "Docker",   image: "docker.png",   width: 48, height: 48, color: "33,150,243" },
  { skill_name: "VS Code",  image: "vscode.svg",   width: 48, height: 48, color: "0,122,204"  },
  { skill_name: "Postman",  image: "postman.svg",  width: 48, height: 48, color: "255,108,55" },
];

const EXPLORING = [
  { skill_name: "Golang",        image: "go.png",           width: 48, height: 48, color: "0,173,216"  },
  { skill_name: "System Design", image: "systemdesign.svg", width: 48, height: 48, color: "255,255,255"},
];

/* ─── Shared section label ──────────────────────────────────────────── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full border-b border-[#3F3F46]/50 pb-1.5 mb-3">
    <h3 className="text-xs sm:text-sm font-bold text-[#A1A1AA] uppercase tracking-widest">
      {children}
    </h3>
  </div>
);

/* ─── Shared icon row ───────────────────────────────────────────────── */
const IconRow = ({
  skills,
  wrap = true,
}: {
  skills: typeof FULL_STACK_ROW;
  wrap?: boolean;
}) => (
  <div
    className="flex flex-wrap gap-2 sm:gap-3 justify-center"
    style={{ overflow: "visible" }}
  >
    {skills.map((skill, i) => (
      <SkillDataProvider
        key={skill.skill_name}
        src={skill.image}
        name={skill.skill_name}
        width={skill.width}
        height={skill.height}
        index={i}
        color={skill.color}
      />
    ))}
  </div>
);

/* ─── Motion presets ────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, delay },
});

/* ─── Skills Section ────────────────────────────────────────────────── */
export const Skills = () => {
  return (
    <section
      id="skills"
      className="relative w-full min-h-[calc(100vh-65px)] pt-6 pb-10 scroll-mt-[65px]"
      // overflow-visible so tooltips near the top edge are not clipped
      style={{ overflow: "visible" }}
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-5 md:px-6 pt-4">
        <div className="w-full flex flex-col">

          {/* ── Heading ─────────────────────────────────────────────── */}
          <motion.div {...fadeUp()} className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAFAFA] tracking-tight mb-1.5">
              Skills
            </h2>
            <p className="text-[#A1A1AA] text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Technologies I use to build real-world applications
            </p>
          </motion.div>

          {/* ── Content grid ────────────────────────────────────────── */}
          <div className="flex flex-col gap-5 sm:gap-6 w-full">

            {/* Full-Stack Development — full width */}
            <motion.div {...fadeUp(0)} className="w-full flex flex-col">
              <SectionLabel>Full-Stack Development</SectionLabel>
              <IconRow skills={FULL_STACK_ROW} />
            </motion.div>

            {/* Row 1: Programming Languages | AI / ML — 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 w-full">
              <motion.div {...fadeUp(0.1)} className="flex flex-col">
                <SectionLabel>Programming Languages</SectionLabel>
                <IconRow skills={PROGRAMMING_LANGUAGES} />
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="flex flex-col">
                <SectionLabel>AI / Machine Learning</SectionLabel>
                <IconRow skills={AI_ML} />
              </motion.div>
            </div>

            {/* Row 2: Tools & Ecosystem | Currently Exploring — 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 w-full">
              <motion.div {...fadeUp(0.2)} className="flex flex-col">
                <SectionLabel>Tools &amp; Ecosystem</SectionLabel>
                <IconRow skills={TOOLS} />
              </motion.div>

              <motion.div {...fadeUp(0.25)} className="flex flex-col">
                <SectionLabel>Currently Exploring</SectionLabel>
                <IconRow skills={EXPLORING} />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
