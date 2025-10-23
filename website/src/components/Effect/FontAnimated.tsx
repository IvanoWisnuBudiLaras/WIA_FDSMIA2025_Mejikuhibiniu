"use client";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <div className={`flex space-x-[1px] ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-pointer"
          whileHover={{
            y: -6,
            rotate: [0, -5, 5, 0],
            transition: {
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          style={{
            display: "inline-block",
            willChange: "transform",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
