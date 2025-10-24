"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

interface TextAnimatedProps {
  text: string;
}

export default function TextAnimated({ text }: TextAnimatedProps) {
  const letters = text.split("");
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const el = scope.current as HTMLElement;
    if (!el) return;

    el.querySelectorAll("span").forEach((span) => {
      (span as HTMLElement).style.transform = "translateY(0px)";
    });
  }, [scope]);

  const handleHoverStart = async () => {
    const el = scope.current as HTMLElement;
    if (!el) return;

    const spans = el.querySelectorAll("span");
    for (let i = 0; i < spans.length; i++) {
      // Pakai properti virtual 'y'
      await animate(
        spans[i],
        { y: [-2, -8, 0] },
        { duration: 0.4, delay: i * 0.03, ease: "easeInOut" }
      );
    }
  };

  return (
    <motion.span
      ref={scope}
      className="inline-block cursor-pointer select-none"
      onHoverStart={handleHoverStart}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block text-[2rem] font-bold text-[#f0ecd9]"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
