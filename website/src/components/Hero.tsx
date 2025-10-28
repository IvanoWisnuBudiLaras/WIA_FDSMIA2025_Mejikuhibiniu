"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import VelocityScroll from "@/components/Effect/scroll-velocity";

gsap.registerPlugin(ScrollTrigger);

const diamonds = [
  { x: "8%", y: "18%", size: 44 },
  { x: "22%", y: "60%", size: 36 },
  { x: "78%", y: "22%", size: 52 },
  { x: "90%", y: "60%", size: 40 },
  { x: "34%", y: "8%", size: 30 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const diamondRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🟦 Parallax background movement
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

      // 🟨 Floating diamonds movement
      diamondRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -60 : 60),
          rotation: 45,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 6 + i,
          delay: 0.2 * i,
        });

        // Scroll-trigger subtle horizontal parallax
        gsap.to(el, {
          xPercent: (i % 2 === 0 ? -8 : 8),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });

      // 🟥 PARALLAX TEXT EFFECT (hero headline)
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: -25, // gerak ke atas 25% saat scroll
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 🟩 Parallax untuk subtitle
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          yPercent: -50, // lebih cepat biar terasa depth
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

  return (
    <section ref={containerRef} className="hero" role="banner" aria-label="Hero UMKM">
      {/* floating decorative diamonds */}
      {diamonds.map((d, idx) => (
        <div
          key={idx}
          ref={(el) => { if (el) diamondRefs.current[idx] = el; }}
          className="diamond"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
          }}
          aria-hidden
        />
      ))}

      {/* Text content with parallax */}
      <div className="text-center relative z-10">
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="headline"
        >
         Welcome<br />  To UMKM
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
      <div className="absolute bottom-0 left-0 w-full">
        <VelocityScroll text="scroll more ⏬" default_velocity={3} className="sm:text-2xl md:text-4xl milker-font bg-alt-white text-alt-black py-4"/>
      </div>
    </section>
  );
}
