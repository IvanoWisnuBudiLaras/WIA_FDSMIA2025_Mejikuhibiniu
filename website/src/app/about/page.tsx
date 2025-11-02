"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);

  // Ganti background halus antar section
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".color-section");
    const colors = ["#F9FAFB", "#F3F4F6", "#E5E7EB", "#FFFFFF"];

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () =>
          gsap.to(container.current, {
            backgroundColor: colors[i % colors.length],
            duration: 1,
            ease: "power2.out",
          }),
        onEnterBack: () =>
          gsap.to(container.current, {
            backgroundColor: colors[i % colors.length],
            duration: 1,
            ease: "power2.out",
          }),
      });
    });
  }, []);

  return (
    <main
      ref={container}
      className="text-[#ffffff] transition-colors duration-1000 overflow-hidden"
    >
      {/* SECTION 1 */}
      <ColorSection>
        <RevealText
          text={`Tentang TulungUsaha`}
          className="text-6xl md:text-7xl font-extrabold leading-tight mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl text-lg text-gray-600 leading-relaxed"
        >
          TulungUsaha adalah platform digital yang menghadirkan pelaku usaha
          lokal dengan tampilan visual modern. Kami membantu UMKM tampil
          menarik, profesional, dan relevan di dunia digital.
        </motion.p>
      </ColorSection>

      {/* SECTION 2 */}
      <ColorSection>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-10"
        >
          Nilai Utama Kami
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Kreativitas",
              text: "Menampilkan identitas unik tiap UMKM dengan pendekatan desain yang kuat.",
            },
            {
              title: "Kolaborasi",
              text: "Menghubungkan pelaku usaha lokal dengan dunia digital secara berkelanjutan.",
            },
            {
              title: "Keberlanjutan",
              text: "Fokus pada pertumbuhan jangka panjang agar UMKM tetap relevan dan berkembang.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-sm bg-white border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-3 text-[#1E40AF]">
                {card.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </ColorSection>

      {/* SECTION 3 */}
      <ColorSection>
        <RevealText
          text={`Mendukung Digitalisasi UMKM`}
          className="text-5xl md:text-6xl font-bold mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl text-lg leading-relaxed"
        >
          Kami percaya setiap usaha lokal layak mendapat ruang untuk berkembang
          di era digital. Dengan desain yang elegan dan pengalaman pengguna yang
          kuat, kami membantu UMKM tampil menonjol.
        </motion.p>
      </ColorSection>

      {/* SECTION 4 - CTA */}
      <ColorSection>
        <RevealText
          text={`Jelajahi UMKM`}
          className="text-6xl md:text-7xl font-extrabold mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/Showcase">
            <button className="px-8 py-4 text-base font-semibold rounded-full bg-[#1E40AF] text-white hover:bg-[#172554] transition-all shadow-md">
              Lihat Semua UMKM →
            </button>
          </Link>
        </motion.div>
      </ColorSection>
    </main>
  );
}

// ================= COMPONENTS =================

function ColorSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="color-section min-h-[100vh] flex flex-col justify-center px-[8vw] py-[10vh] space-y-6">
      {children}
    </section>
  );
}

// Reveal teks simple & pendek
function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className || ""}`}>
      <div className="relative overflow-hidden inline-block align-bottom">
        <motion.span
          initial={{ x: 0 }}
          whileInView={{ x: "105%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute top-0 left-0 h-full bg-[#1E40AF] z-10 rounded-md"
          style={{ width: "100%" }}
        />
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-20 block"
        >
          {text}
        </motion.span>
      </div>
    </div>
  );
}
