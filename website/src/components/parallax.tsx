// src/components/Parallax.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function Parallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
     ref={ref} 
     className="w-full relative h-[115vh] overflow-hidden grid place-items-center">
      <motion.h1
        style={{ y: textY }}
        className="absolute bottom-2/3 font-bold text-white text-9xl md:-[12rem] z-10"
      >
        TULUNGAGUNG
      </motion.h1>

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/image-full.png)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/image-remove.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
