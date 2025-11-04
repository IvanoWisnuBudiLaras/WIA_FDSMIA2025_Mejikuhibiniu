"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import galleryData from "@/data/Gallery.json";

// ======================= POSITIONS =======================
const POSITIONS = [
  { x: "3%", y: "10%", size: 240 },
  { x: "22%", y: "8%", size: 260 },
  { x: "55%", y: "12%", size: 220 },
  { x: "75%", y: "20%", size: 240 },
  { x: "10%", y: "38%", size: 230 },
  { x: "35%", y: "30%", size: 260 },
  { x: "60%", y: "35%", size: 220 },
  { x: "80%", y: "40%", size: 240 },
  { x: "15%", y: "58%", size: 220 },
  { x: "42%", y: "55%", size: 240 },
  { x: "68%", y: "62%", size: 230 },
  { x: "85%", y: "65%", size: 220 },
  { x: "5%", y: "78%", size: 240 },
  { x: "30%", y: "75%", size: 230 },
  { x: "55%", y: "80%", size: 250 },
  { x: "78%", y: "85%", size: 220 },
];

// ======================= GALLERY DATA =======================
const gallery = (galleryData as any[]) || [];
const fallbackPool = gallery.map((g) => g.Gambar).filter(Boolean);
const PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

// Deterministic zIndex to prevent SSR mismatch
const IMAGES = POSITIONS.map((p, i) => ({
  src: fallbackPool[i % fallbackPool.length] || PLACEHOLDER,
  x: p.x,
  y: p.y,
  size: p.size,
  z: (i * 7) % 20, // deterministic zIndex
}));

// ======================= CLIENT-ONLY WRAPPER =======================
export default function FloatingGalleryWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return <FloatingGallery />;
}

// ======================= FLOATING GALLERY =======================
function FloatingGallery() {
  console.log("FloatingGallery rendered, gallery data length:", gallery.length);
  return (
    <div className="relative w-full min-h-[200vh] overflow-hidden bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50">
      <Gallery />
    </div>
  );
}

// ======================= GALLERY COMPONENT =======================
function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="relative min-h-[160vh] w-full">
      {/* gradient fade untuk nutup hero */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-white via-white/70 to-transparent z-[5]" />

      {IMAGES.map((img, i) => (
        <FloatingImage key={i} {...img} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// ======================= FLOATING IMAGE =======================
function FloatingImage({
  src,
  x,
  y,
  size,
  index,
  z,
  scrollYProgress,
}: {
  src: string;
  x: string;
  y: string;
  size: number;
  index: number;
  z: number;
  scrollYProgress: any;
}) {
  const controls = useAnimation();

  // Scroll-based motion
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 0 : -20, index % 2 === 0 ? -30 : 30]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  // Floating motion
  useEffect(() => {
    controls.start({
      y: [0, -10, 10, -5, 0],
      transition: {
        duration: 10 + index * 0.3, // slightly different for each image
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ y: 0, scale: 1.05, opacity: 0 }}
      animate={controls}
      style={{
        position: "absolute",
        top: y,
        left: x,
        zIndex: z,
        y: translateY,
        scale,
        opacity,
      }}
      className="transition-transform duration-500 hover:scale-110"
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          className="object-cover rounded-2xl block select-none"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
// FloatingGallery.tsx