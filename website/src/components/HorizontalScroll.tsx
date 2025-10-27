"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/eco.webp",
  "/cafe.webp",
  "/martabak.jpeg",
  "/rin1.jpeg",
  "/tb.jpeg",
   "/eco.webp",
  "/cafe.webp",
  "/martabak.jpeg",
  "/rin1.jpeg",
  "/tb.jpeg",
];

const HorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* TEKS */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "5%",
          zIndex: 20,
          color: "#000",
          lineHeight: "0.9",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontSize: "6.5vw",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          IN YOUR
        </h1>
        <h1
          style={{
            fontSize: "9vw",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          FEED
        </h1>
      </div>

      {/* FOTO-FOTO */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: "99vh",
          paddingBottom: "5vh", // ruang di bawah
          gap: "0.5rem", // jarak antar foto tipis
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              minWidth: "35vw",
              height: "60vh",
              borderRadius: "1rem",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt={`UMKM ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
