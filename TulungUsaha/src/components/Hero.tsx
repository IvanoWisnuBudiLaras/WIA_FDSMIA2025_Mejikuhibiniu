"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const colors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#FFA07A", // Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
];

const shapes = [
  { x: "8%", y: "90%", size: 44, shape: "diamond", color: colors[0] },
  { x: "20%", y: "85%", size: 36, shape: "square", color: colors[1] },
  { x: "35%", y: "95%", size: 40, shape: "circle", color: colors[2] },
  { x: "55%", y: "88%", size: 48, shape: "triangle", color: colors[3] },
  { x: "70%", y: "92%", size: 52, shape: "diamond", color: colors[4] },
  { x: "85%", y: "87%", size: 38, shape: "circle", color: colors[5] },
  { x: "45%", y: "94%", size: 32, shape: "square", color: colors[6] },
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

  const getShapeStyle = (s: any) => {
    const baseStyle = {
      left: s.x,
      top: s.y,
      width: s.size,
      height: s.size,
      backgroundColor: s.color,
    };

    // Special handling for triangle
    if (s.shape === "triangle") {
      return {
        ...baseStyle,
        backgroundColor: "transparent",
        borderLeft: `${s.size / 2.93}px solid transparent`,
        borderRight: `${s.size / 2.93}px solid transparent`,
        borderBottom: `${(s.size * 0.866)}px solid ${s.color}`,
      };
    }

    return baseStyle;
  };

  return (
    <section ref={containerRef} className="hero" role="banner" aria-label="Hero UMKM">
      {/* Floating Shapes */}
      {shapes.map((s, idx) => {
        // Convert previous 'triangle' shape to a rounded rectangle (persegi panjang)
        if (s.shape === "triangle") {
          const outerStyle: React.CSSProperties = {
            left: s.x,
            top: s.y,
            width: s.size * 1.6,
            height: s.size * 0.7,
            backgroundColor: 'transparent',
            position: 'absolute',
            overflow: 'visible',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          };

          const rectStyle: React.CSSProperties = {
            width: '100%',
            height: '100%',
            backgroundColor: s.color,
            borderRadius: Math.max(6, s.size * 0.15),
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          };

          return (
            <div
              key={idx}
              ref={(el) => {
                if (el) shapeRefs.current[idx] = el;
              }}
              className={shapeClass('square')}
              style={outerStyle}
              aria-hidden
            >
              <div style={rectStyle} />
            </div>
          );
        }

        return (
          <div
            key={idx}
            ref={(el) => {
              if (el) shapeRefs.current[idx] = el;
            }}
            className={shapeClass(s.shape)}
            style={getShapeStyle(s)}
            aria-hidden
          />
        );
      })}

      {/* Text content */}
      <div className="text-center relative z-10">
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-black"
        >
          Welcome To<br />TulungUsaha
        </motion.h1>

        <motion.div
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="subtitle mt-4 text-base sm:text-lg md:text-xl text-gray-700"
        >
          Mendukung usaha mikro, kecil & menengah
        </motion.div>
      </div>

    </section>
  );
}
