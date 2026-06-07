"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, Sparkles, Zap, Rocket, Terminal, Coffee } from "lucide-react";

export function CinematicSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const newX = (e.clientX - centerX) / 20;
        const newY = (e.clientY - centerY) / 20;
        mouseX.set(newX);
        mouseY.set(newY);
        setMousePosition({ x: newX, y: newY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingIcons = [
    { Icon: Code2, delay: 0, x: -100, y: -50 },
    { Icon: Sparkles, delay: 0.2, x: 100, y: -80 },
    { Icon: Zap, delay: 0.4, x: -80, y: 80 },
    { Icon: Rocket, delay: 0.6, x: 120, y: 60 },
    { Icon: Terminal, delay: 0.8, x: -60, y: -100 },
    { Icon: Coffee, delay: 1, x: 90, y: -40 },
  ];

  const codeLines = [
    "const passion = '∞';",
    "function build() {",
    "  return awesome;",
    "}",
    "while(alive) { code(); }",
  ];

  return (
    <section
      ref={ref}
      className="relative w-full py-32 overflow-hidden border-y border-border/50"
      id="cinematic"
    >
      {/* Animated background with parallax */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{ x, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Static icons */}
      {floatingIcons.map(({ Icon, delay, x: offsetX, y: offsetY }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? {
                  opacity: 0.3,
                  scale: 1,
                }
              : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: 0.6,
            delay,
            ease: "easeOut",
          }}
          style={{
            left: "50%",
            top: "50%",
            marginLeft: offsetX,
            marginTop: offsetY,
          }}
        >
          <Icon className="w-8 h-8 text-foreground/20" />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Left side - Code animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
              },
            }}
            className="relative"
          >
            <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  terminal
                </span>
              </div>

              {/* Code lines */}
              <div className="space-y-2 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            x: 0,
                          }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.5 + index * 0.2,
                      duration: 0.4,
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-muted-foreground select-none">
                      {index + 1}
                    </span>
                    <span className="text-foreground/80">{line}</span>
                    {index === codeLines.length - 1 && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-foreground ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
              },
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.5 },
                  },
                }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-xs font-medium text-foreground/60 border border-border">
                  Fun Fact
                </span>
              </motion.div>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.5 },
                  },
                }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
              >
                <span className="text-foreground">Code</span>
                <br />
                <span className="text-foreground/60">Coffee</span>
                <br />
                <span className="text-foreground/40">Repeat</span>
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  },
                }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Turning caffeine into code, one commit at a time. Building
                digital experiences that make a difference.
              </motion.p>
            </div>

            {/* Interactive stats */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.6, duration: 0.5 },
                },
              }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {[
                { value: "∞", label: "Ideas" },
                { value: "24/7", label: "Energy" },
                { value: "100%", label: "Fun" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-default"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="h-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      </motion.div>
    </section>
  );
}
