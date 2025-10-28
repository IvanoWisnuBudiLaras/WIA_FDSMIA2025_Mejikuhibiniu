"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Efek hero menutupi lalu naik ke atas saat scroll
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: hero.current, // hero di-pin
        pinSpacing: false, // tidak menambah jarak ekstra
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative min-h-[200vh] bg-[var(--BackgroundColor)] text-[var(--TextColor)]">
      {/* Hero yang menutupi */}
      <section
        ref={hero}
        className="h-screen bg-[var(--BackgroundColor)] flex flex-col justify-center items-center text-center z-20"
      >
        <h1 className="text-7xl font-black leading-none">ABOUT</h1>
        <p className="max-w-xl mt-6 text-lg text-[var(--TextColor)]/80">
          Menampilkan kreativitas dan produk lokal Tulungagung dengan pengalaman interaktif.
        </p>
      </section>

      {/* About di belakang hero */}
      <section className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-8">
        <div className="max-w-3xl text-center text-[var(--TextColor)]">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">Tentang Website Ini</h2>
          <p className="text-xl leading-relaxed">
            Website ini dirancang untuk memperlihatkan karya, usaha, dan inovasi dari UMKM di Tulungagung.
            Fokus kami adalah menyajikan pengalaman visual yang elegan namun efisien, dengan desain parallax
            dan struktur yang terinspirasi dari estetika web modern seperti Wodniack.dev dan Awwwards.
          </p>
        </div>
      </section>
    </div>
  );
}
