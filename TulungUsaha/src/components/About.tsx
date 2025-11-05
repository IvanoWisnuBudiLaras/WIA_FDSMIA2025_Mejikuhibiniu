"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import galleryData from "@/data/Gallery.json";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("AboutPage mounted");
    console.log("Gallery data:", galleryData);
  }, []);

  // Transisi background antar section
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".color-section");
    const colors = ["#ffffff", "#f9fafb", "#f3f4f6", "#e5e7eb"];

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
      className="transition-colors duration-1000 text-[#0f172a] overflow-x-hidden"
    >
      {/* SECTION 1 - Left aligned */}
      <ColorSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-left">
            <RevealText
              text="UMKM"
              className="text-4xl md:text-5xl font-extrabold"
            />
            <RevealText
              text="TULUNGAGUNG"
              className="text-4xl md:text-5xl font-extrabold"
            />
            <ParagraphRevealText
              text="UMKM Tulungagung adalah tempat berkumpulnya para pelaku usaha kreatif yang menghadirkan produk penuh inovasi dan kualitas terbaik dari daerah."
              className="text-lg text-gray-700"
            />
          </div>
        </div>
      </ColorSection>

      {/* SECTION 2 - Right aligned */}
<ColorSection>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div className="hidden md:block" /> {/* spacer kiri */}
    <div className="space-y-5 text-left md:ml-auto">
      <RevealText
        text="Terus Website ini buat"
        className="text-4xl md:text-5xl font-semibold"
      />
      <RevealText
        text="apa?"
        className="text-4xl md:text-5xl font-semibold"
      />
      {/* 1 paragraf saja */}
      <RevealText
        text="Website ini dibuat untuk memperkenalkan dan memajukan UMKM Tulungagung agar dikenal luas oleh masyarakat, serta membantu pelaku usaha meningkatkan kepercayaan pelanggan."
        className="text-lg text-gray-700 ml-auto"
      />
    </div>
  </div>
</ColorSection>

      {/* SECTION 3 */}
      <ColorSection>
        <RevealText
          text="UMKM Tulungagung membantu UMKM sebanyak"
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
        />
        <div className="grid grid-cols-3 gap-4 md:gap-12 text-center">
          {[{ level: "MICRO", count: 10 }, { level: "KECIL", count: 5 }, { level: "MENENGAH", count: 10 }].map(
            (item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full border-2 border-[#1E40AF] flex items-center justify-center mb-3">
                  <span className="text-4xl">🏪</span>
                </div>
                <h4 className="font-semibold text-lg">{item.level}</h4>
                <p className="text-2xl font-bold text-[#1E40AF]">{item.count}</p>
              </motion.div>
            )
          )}
        </div>
      </ColorSection>

      {/* SECTION 4 */}
<ColorSection>
  <RevealText
    text="3 UMKM yang Kami Rekomendasikan"
    className="text-3xl md:text-4xl font-bold mb-10 text-center"
  />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
    {(() => {
      const gallery = (galleryData as any[]) || [];
      const popular = gallery.filter((item) =>
        Object.values(item).some(
          (v) => typeof v === "string" && v.toUpperCase().includes("POPULAR")
        )
      );
      const pool = (popular.length ? popular : gallery).slice(0, 3);

      return pool.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex flex-col cursor-pointer"
        >
          <div className="h-52 w-full relative overflow-hidden">
            <img
              src={item.Gambar}
              alt={item.Nama}
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">{item.Nama}</h3>
              {/* 1 paragraf reveal saja */}
              <RevealText
                text={item.Dheskripsi}
                className="text-sm text-gray-600 line-clamp-3"
              />
            </div>
            <div className="text-right mt-3">
              <a
                href={item.Instagram}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Instagram →
              </a>
            </div>
          </div>
        </motion.div>
      ));
    })()}
  </div>
</ColorSection>

      {/* SECTION 5 */}
      <ColorSection>
        <ParagraphRevealText
          text="Dan jika kalian masih belum puas, kami memiliki lebih banyak UMKM yang bisa kalian jelajahi untuk melihat betapa luas dan kreatifnya UMKM Tulungagung."
          className="text-lg text-center text-gray-700 mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
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

/* =====================================
   COMPONENTS
===================================== */

function ColorSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="color-section min-h-[100vh] flex flex-col justify-center px-[8vw] py-[10vh] space-y-6">
      {children}
    </section>
  );
}

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

/* Helper component untuk paragraf panjang */
function ParagraphRevealText({ text, className }: { text: string; className?: string }) {
  const lines = text.split(/(?<=\.|,)/).map(line => line.trim()).filter(Boolean);

  return (
    <>
      {lines.map((line, i) => (
        <RevealText key={i} text={line} className={className} />
      ))}
    </>
  );
}