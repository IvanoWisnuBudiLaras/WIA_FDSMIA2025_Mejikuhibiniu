"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import VelocityScroll from "./scroll-velocity";

gsap.registerPlugin(ScrollTrigger);

const shapes = [
  { x: "8%", y: "90%", size: 44, shape: "diamond" },
  { x: "20%", y: "85%", size: 36, shape: "square" },
  { x: "35%", y: "95%", size: 40, shape: "circle" },
  { x: "55%", y: "88%", size: 48, shape: "triangle" },
  { x: "70%", y: "92%", size: 52, shape: "diamond" },
  { x: "85%", y: "87%", size: 38, shape: "circle" },
  { x: "45%", y: "94%", size: 32, shape: "square" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const shapeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔵 Parallax background
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

      // 🟣 Floating shapes (naik + rotasi acak)
      shapeRefs.current.forEach((el, i) => {
        const randomDuration = 6 + Math.random() * 5;
        const randomDelay = Math.random() * 4;
        const randomRotate = 180 + Math.random() * 180;

        gsap.to(el, {
          y: -600 - Math.random() * 400, // gerak ke atas
          rotation: randomRotate,
          ease: "none",
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          yoyo: false,
          onRepeat: () => {
            // reset ke bawah tiap loop
            gsap.set(el, { y: 0, rotation: 0 });
          },
        });
      });

      // 🟥 Parallax teks
      if (headlineRef.current) {
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
      }

      if (subtitleRef.current) {
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const shapeClass = (shape: string) => {
    switch (shape) {
      case "circle":
        return "shape circle";
      case "square":
        return "shape square";
      case "triangle":
        return "shape triangle";
      default:
        return "shape diamond";
    }
  };

  return (
    <section ref={containerRef} className="hero" role="banner" aria-label="Hero UMKM">
      {/* Floating Shapes */}
      {shapes.map((s, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) shapeRefs.current[idx] = el;
          }}
          className={shapeClass(s.shape)}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
          }}
          aria-hidden
        ></div>
      ))}

      {/* Text content */}
      <div className="text-center relative z-10">
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="headline"
        >
          Welcome <br /> To UMKM
        </motion.h1>

        <motion.div
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="subtitle"
        >
          Mendukung usaha mikro, kecil & menengah
        </motion.div>
      </div>

    </section>
  );
}
