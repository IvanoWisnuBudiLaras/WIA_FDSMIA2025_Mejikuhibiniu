"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import galleryData from "@/data/Gallery.json";

const gallery = (galleryData as any[]) || [];
const images = gallery.map((g) => g.Gambar).filter(Boolean);
const PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

export default function FloatingGalleryWrapper() {
  return (
    <div className="relative w-full min-h-[240vh] bg-white overflow-hidden">
      <FloatingGallery />

      {/* Bagian bawah biar gak kosong */}
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

  // Posisi tetap proporsional, gak tumpuk
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
  index,
}: {
  src: string;
  x: string;
  y: string;
  w: string;
  h: string;
  index: number;
}) {
  const controls = useAnimation();

  useEffect(() => {
    // Variasi kecepatan berdasarkan index untuk konsistensi
    const baseSpeed = 8 + (index % 5) * 2.5; // 8, 10.5, 13, 15.5, 18 detik
    const distance = 15 + (index % 7) * 5; // variasi jarak 15-45px
    
    // Pola gerakan berbeda per gambar
    const direction = index % 3 === 0 ? 1 : -1;
    const delay = (index * 0.3) % 2; // stagger start

    controls.start({
      y: [0, distance * direction, -distance * direction * 0.8, 0],
      transition: {
        duration: baseSpeed,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
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
        width: w,
        height: h,
        transform: "translate(-50%, 0)",
      }}
      className="relative rounded-2xl overflow-hidden bg-gray-100 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-gray-300 hover:border-gray-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:scale-[1.05] transition-all duration-700 ease-out"
    >
      <Image
        src={src || PLACEHOLDER}
        alt={""}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 40vw, 12vw"
        onError={(e) => {
          try {
            const target = e.currentTarget as HTMLImageElement;
            target.src = PLACEHOLDER;
          } catch (err) {
            /* ignore */
          }
        }}
        unoptimized
      />
    </motion.div>
  );
}