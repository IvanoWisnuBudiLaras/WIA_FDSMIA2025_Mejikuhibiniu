"use client";

import { motion, useAnimate } from "motion/react";
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

    // Reset posisi huruf
    el.querySelectorAll("span").forEach((span) => {
      (span as HTMLElement).style.transform = "translateY(0px)";
    });
  }, [scope]);

  const handleHoverStart = () => {
    const el = scope.current as HTMLElement;
    if (!el) return;

    const spans = el.querySelectorAll("span");
    spans.forEach((span, i) => {
      animate(
        span,
        { y: [-2, -8, 0] },
        { delay: i * 0.03, duration: 0.4, easing: "ease-in-out" }
      );
    });
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
