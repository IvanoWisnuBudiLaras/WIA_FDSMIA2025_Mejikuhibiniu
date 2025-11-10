"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import galleryData from "@/data/Gallery.json";

const gallery = (galleryData as any[]) || [];
const images = gallery.map((g) => g.Gambar).filter(Boolean);

export default function FloatingGalleryWrapper() {
  return (
    <div className="relative w-full min-h-[240vh] bg-transparent overflow-hidden">
      <FloatingGallery />
      {/* Bagian bawah biar nggak kosong */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] flex flex-col justify-center items-center bg-gradient-to-t from-white/5 via-transparent to-transparent backdrop-blur-sm">
        <p className="text-neutral-600 text-sm tracking-wide mb-1">
          Explore More Visuals
        </p>
        <div className="w-8 h-8 rounded-full border border-neutral-500 flex items-center justify-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FloatingGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Posisi manual, campur portrait-landscape
  const positions = [
    { x: "10%", y: "5%", w: "12vw", h: "17vw" },
    { x: "28%", y: "6%", w: "14vw", h: "10vw" },
    { x: "47%", y: "4%", w: "12vw", h: "18vw" },
    { x: "67%", y: "7%", w: "14vw", h: "10vw" },
    { x: "85%", y: "6%", w: "12vw", h: "17vw" },

    { x: "13%", y: "28%", w: "14vw", h: "10vw" },
    { x: "32%", y: "27%", w: "12vw", h: "17vw" },
    { x: "50%", y: "26%", w: "14vw", h: "10vw" },
    { x: "68%", y: "28%", w: "12vw", h: "17vw" },
    { x: "86%", y: "27%", w: "14vw", h: "10vw" },

    { x: "9%", y: "49%", w: "12vw", h: "17vw" },
    { x: "27%", y: "48%", w: "14vw", h: "10vw" },
    { x: "46%", y: "47%", w: "12vw", h: "17vw" },
    { x: "65%", y: "48%", w: "14vw", h: "10vw" },
    { x: "83%", y: "50%", w: "12vw", h: "17vw" },

    { x: "15%", y: "68%", w: "14vw", h: "10vw" },
    { x: "34%", y: "69%", w: "12vw", h: "17vw" },
    { x: "53%", y: "67%", w: "14vw", h: "10vw" },
    { x: "72%", y: "68%", w: "12vw", h: "17vw" },
    { x: "90%", y: "70%", w: "14vw", h: "10vw" },
  ];

  return (
    <div ref={ref} className="relative min-h-[220vh] w-full">
      {positions.map((pos, i) => (
        <FloatingImage
          key={i}
          src={images[i % images.length]}
          x={pos.x}
          y={pos.y}
          w={pos.w}
          h={pos.h}
          scrollYProgress={scrollYProgress}
          index={i}
        />
      ))}
    </div>
  );
}

function FloatingImage({
  src,
  x,
  y,
  w,
  h,
  scrollYProgress,
  index,
}: {
  src: string;
  x: string;
  y: string;
  w: string;
  h: string;
  scrollYProgress: any;
  index: number;
}) {
  const controls = useAnimation();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, index % 2 ? -8 : 8]);

  useEffect(() => {
    controls.start({
      y: [0, -3, 3, -2, 0],
      transition: {
        duration: 7 + index * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, index]);

  return (
    <motion.div
      animate={controls}
      style={{
        position: "absolute",
        top: y,
        left: x,
        y: translateY,
        width: w,
        height: h,
        transform: "translate(-50%, 0)",
      }}
      className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:scale-[1.04] transition-transform duration-500"
    >
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}
