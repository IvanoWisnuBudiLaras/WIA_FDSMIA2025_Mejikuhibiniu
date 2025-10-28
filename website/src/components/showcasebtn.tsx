"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MotionLink = motion(Link);

export default function ShowcaseButton() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <MotionLink
        href="/Showcase"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[var(--PrimaryColor)] to-[var(--SecondaryColor)] shadow-[0_8px_25px_rgba(0,0,0,0.25)] overflow-hidden backdrop-blur-md"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--SecondaryColor)] to-[var(--PrimaryColor)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        <span className="relative z-10">Showcase</span>

        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </MotionLink>
    </motion.div>
  );
}
