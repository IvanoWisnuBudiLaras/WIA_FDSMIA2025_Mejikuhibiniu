"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
];

const shapes = [
  { x: "8%", y: "90%", size: 44, shape: "diamond", color: colors[0] },
  { x: "20%", y: "85%", size: 36, shape: "square", color: colors[1] },
  { x: "35%", y: "95%", size: 40, shape: "circle", color: colors[2] },
  { x: "55%", y: "88%", size: 48, shape: "rounded", color: colors[3] },
  { x: "70%", y: "92%", size: 52, shape: "diamond", color: colors[4] },
  { x: "85%", y: "87%", size: 38, shape: "circle", color: colors[5] },
  { x: "45%", y: "94%", size: 32, shape: "square", color: colors[6] },
];

// 4 gambar saja
const heroImages = [
  { src: "/gallery/umkm1.jpg", x: "10%", y: "30%", w: 160, speed: 12 },
  { src: "/gallery/umkm2.jpg", x: "70%", y: "25%", w: 180, speed: 18 },
  { src: "/gallery/umkm3.jpg", x: "20%", y: "60%", w: 150, speed: 25 },
  { src: "/gallery/umkm4.jpg", x: "75%", y: "55%", w: 170, speed: 30 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  const shapeRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(containerRef.current, {
        backgroundPosition: "50% 40%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Floating shapes
      shapeRefs.current.forEach((el) => {
        const randomDuration = 6 + Math.random() * 5;
        const randomDelay = Math.random() * 4;
        const randomRotate = 180 + Math.random() * 180;

        gsap.to(el, {
          y: -600 - Math.random() * 400,
          rotation: randomRotate,
          ease: "none",
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          onRepeat: () => {
            gsap.set(el, { y: 0, rotation: 0 });
          },
        });
      });

      // Parallax images
      imageRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: -heroImages[i].speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Headline parallax
      gsap.to(headlineRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Subtitle parallax
      gsap.to(subtitleRef.current, {
        yPercent: -50,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const getShapeStyle = (s: any): React.CSSProperties => {
    if (s.shape === "rounded") {
      return {
        position: "absolute",
        left: s.x,
        top: s.y,
        width: s.size * 1.6,
        height: s.size * 0.7,
        backgroundColor: s.color,
        borderRadius: "14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      };
    }

    return {
      position: "absolute",
      left: s.x,
      top: s.y,
      width: s.size,
      height: s.size,
      backgroundColor: s.color,
      borderRadius:
        s.shape === "circle"
          ? "50%"
          : s.shape === "diamond"
          ? "8px"
          : "6px",
      transform: s.shape === "diamond" ? "rotate(45deg)" : "none",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    };
  };

  return (
    <section
      ref={containerRef}
      className="hero relative w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-100 overflow-hidden"
    >
      {/* Floating Shapes */}
      {shapes.map((s, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) shapeRefs.current[idx] = el;
          }}
          style={getShapeStyle(s)}
          aria-hidden="true"
        />
      ))}

      {/* Parallax Images */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) imageRefs.current[idx] = el;
          }}
          className="absolute rounded-xl overflow-hidden shadow-lg"
          style={{
            left: img.x,
            top: img.y,
            width: img.w,
            height: img.w * 0.65,
          }}
        >
          <Image
            src={img.src}
            alt="hero-img"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}

      {/* Text */}
      <div className="text-center relative z-10 px-4">
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-sm"
        >
          Welcome To <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            TulungUsaha
          </span>
        </motion.h1>

        <motion.div
          ref={subtitleRef}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-gray-700 text-lg sm:text-xl max-w-xl mx-auto"
        >
          Mendukung usaha mikro, kecil & menengah
        </motion.div>
      </div>
    </section>
  );
}
