"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import FloatingGalleryWrapper from "./FloatingGallery";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "200%",
          scrub: true,
          pin: true,
        },
      });

      // 🟣 Hero fade out & naik
      tl.to(heroRef.current, {
        opacity: 0,
        yPercent: -20,
        ease: "none",
        duration: 1,
      });

      // 🟢 Gallery naik dari bawah menutupi Hero
      tl.fromTo(
        galleryRef.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none", duration: 1 },
        "<" // mulai bersamaan dengan fade Hero
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] overflow-hidden bg-transparent"
    >
      {/* Hero di bawah */}
      <div
        ref={heroRef}
        className="absolute inset-0 z-10 will-change-transform"
      >
        <Hero />
      </div>

      {/* FloatingGallery naik menutupi Hero */}
      <div
        ref={galleryRef}
        className="absolute inset-0 z-20 will-change-transform"
      >
        <FloatingGalleryWrapper />
      </div>
    </section>
  );
}
