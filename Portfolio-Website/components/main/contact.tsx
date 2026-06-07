"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RxCalendar } from "react-icons/rx";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineDocumentText, HiOutlineMail } from "react-icons/hi";

/** Must match navbar.tsx NAVBAR_H */
const NAVBAR_H = 65;

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.07 },
  }),
};

export const Contact = () => {
  const [meetingToast, setMeetingToast] = useState(false);

  const handleScheduleMeeting = () => {
    window.open("https://calendly.com/dharaneeshc2006", "_blank");
    setMeetingToast(true);
    setTimeout(() => setMeetingToast(false), 3000);
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: "40px",
        paddingBottom: "16px",
        minHeight: "auto",
        boxSizing: "border-box",
      }}
      className="relative w-full flex flex-col items-center px-5 z-20 overflow-hidden"
    >
      {/* ── Centered content column — max 750px wide ── */}
      <div className="flex flex-col items-center w-full max-w-[750px]">

        {/* 1 ▸ Contact title */}
        <motion.h2
          custom={0}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAFA] text-center tracking-tight"
          style={{ marginBottom: "24px" }}
        >
          Contact
        </motion.h2>

        {/* 2 ▸ Let's Build Something Together */}
        <motion.h3
          custom={1}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAFAFA] text-center leading-snug"
          style={{ marginBottom: "24px" }}
        >
          Let&apos;s Build Something Together
        </motion.h3>

        {/* 3 ▸ Email + Location pills */}
        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "24px", marginBottom: "24px" }}
        >
          <div className="flex items-center justify-center px-5 py-2 rounded-full bg-[#18181B] border border-[#3F3F46]">
            <span className="text-[#A1A1AA] text-sm sm:text-base font-medium whitespace-nowrap">
              cdharaneesh05@gmail.com
            </span>
          </div>
          <div className="flex items-center justify-center px-5 py-2 rounded-full bg-[#18181B] border border-[#3F3F46]">
            <span className="text-[#A1A1AA] text-sm sm:text-base font-medium whitespace-nowrap">
              Salem, Tamil Nadu, India
            </span>
          </div>
        </motion.div>

        {/* 4 ▸ Action Buttons — same style as Hero */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ marginBottom: "32px" }}
        >
          {/* Primary — Send Email (matches Hero "View Resume") */}
          <motion.a
            href="mailto:cdharaneesh05@gmail.com"
            aria-label="Send an email to cdharaneesh05@gmail.com"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-2 py-3 px-8 button-primary rounded-lg font-semibold text-sm tracking-wide min-w-[160px] cursor-pointer"
            style={{ textDecoration: "none" }}
          >
            <HiOutlineMail className="text-lg" />
            Send Email
          </motion.a>

          {/* Secondary — Schedule a Meeting (matches Hero "Get In Touch") */}
          <motion.button
            onClick={handleScheduleMeeting}
            aria-label="Schedule a meeting via Calendly"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-2 py-3 px-8 text-center text-[#FAFAFA] cursor-pointer rounded-lg font-semibold text-sm tracking-wide border border-[#3F3F46] hover:border-[#52525B] hover:bg-white/[0.03] transition-all duration-200 min-w-[160px] bg-transparent"
          >
            <RxCalendar className="text-lg" />
            Schedule a Meeting
          </motion.button>
        </motion.div>

        {/* 5 ▸ Social Icons */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center"
          style={{ gap: "16px", marginBottom: "32px" }}
        >
          {[
            { icon: FaGithub,              link: "https://github.com/dharaneesh05",          title: "GitHub"   },
            { icon: FaLinkedinIn,          link: "https://www.linkedin.com/in/dharaneesh-c", title: "LinkedIn" },
            { icon: SiLeetcode,            link: "https://leetcode.com/u/Dharaneesh05/",     title: "LeetCode" },
            { icon: HiOutlineDocumentText, link: "/resume.pdf",                              title: "Resume"   },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#18181B]/80 backdrop-blur-md border border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#52525B] transition-colors duration-200"
              style={{ textDecoration: "none" }}
            >
              <social.icon className="text-xl" />
            </motion.a>
          ))}
        </motion.div>



      </div>

      {/* ── Meeting toast ── */}
      {meetingToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-[#18181B] border border-[#3F3F46] text-[#FAFAFA] px-5 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3"
        >
          <RxCalendar className="text-lg text-[#FAFAFA]" />
          <span className="font-medium text-sm">Calendar opened in a new tab.</span>
        </motion.div>
      )}
    </section>
  );
};
