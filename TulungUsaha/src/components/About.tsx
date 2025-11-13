"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
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
      {/* SECTION 1 & 2 - Left and Right aligned */}
      <ColorSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left side - UMKM intro */}
          <div className="space-y-5 text-left">
            <RevealText
              text="UMKM"
              className="text-4xl md:text-6xl font-extrabold text-black"
            />
            <RevealText
              text="TULUNGAGUNG"
              className="text-4xl md:text-6xl font-extrabold text-black"
            />
            <RevealText
              text="UMKM Tulungagung adalah tempat berkumpulnya para pelaku usaha kreatif yang menghadirkan produk penuh inovasi dan kualitas terbaik dari daerah."
              className="text-lg text-black"
            />
          </div>
          
          {/* Right side - Website purpose */}
          <div className="space-y-5 text-left md:col-start-2 md:row-start-2">
            <RevealText
              text="Terus Website ini"
              className="text-4xl md:text-6xl font-semibold text-black"
            />
            <RevealText
              text="buat apa?"
              className="text-4xl md:text-6xl font-semibold text-black"
            />
            <RevealText
              text="Website ini dibuat untuk memperkenalkan dan memajukan UMKM Tulungagung agar dikenal luas oleh masyarakat, serta membantu pelaku usaha meningkatkan kepercayaan pelanggan."
              className="text-lg text-black"
            />
          </div>
        </div>
      </ColorSection>

      {/* SECTION 3 */}
      <ColorSection>
        <RevealText
          text="TulungUsaha membantu UMKM "
          className="text-3xl md:text-6xl font-bold text-center text-black"
        />
        <RevealText
          text="sebanyak"
          className="text-3xl md:text-6xl font-bold mb-10 text-center text-black"
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
                className="flex flex-col items-center text-black"
              >
                <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mb-3">
                  <span className="text-4xl">🏪</span>
                </div>
                <h4 className="font-semibold text-lg text-black">{item.level}</h4>
                <p className="text-2xl font-bold text-black">{item.count}</p>
              </motion.div>
            )
          )}
        </div>
      </ColorSection>

      {/* SECTION 4 (sebelumnya SECTION 5) */}
      <ColorSection>
        <RevealText
          text="Dan jika kalian masih belum puas, kami memiliki lebih banyak UMKM yang bisa kalian jelajahi untuk melihat betapa luas dan kreatifnya UMKM Tulungagung."
          className="text-lg text-center text-black mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/Showcase">
            <motion.button
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={{
                rest: { backgroundColor: "#4f46e5", color: "#ffffff" },
                hover: { backgroundColor: "#2563eb", color: "#ffffff" },
                tap: { scale: 0.98 },
              }}
              className="relative px-8 py-4 text-base font-semibold rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-lg overflow-hidden"
            >
              {/* Shine overlay */}
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white/60 to-white/10 transform -skew-x-12"
                variants={{
                  rest: { x: -160, opacity: 0 },
                  hover: { x: 260, opacity: 0.22 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center space-x-3">
                <span>Lihat Semua UMKM</span>
                <motion.span
                  className="inline-block"
                  variants={{ rest: { x: 0 }, hover: { x: 8 }, tap: { x: 2 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </ColorSection>

      {/* SECTION 5 (sebelumnya SECTION 4) */}
<ColorSection>
  {/* Variasi Animasi Card dan Teks agar self-contained */}
  {(() => {
    // Varian untuk card: muncul dari y=50
    const cardUpVariants: Variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "tween" } },
    };
    // Varian untuk teks: muncul dari y=20
    const textUpVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "tween" } },
    };

    const gallery = (galleryData as any[]) || [];
    const popular = gallery.filter((item) =>
      Object.values(item).some(
        (v) => typeof v === "string" && v.toUpperCase().includes("POPULAR")
      )
    );
    const pool = (popular.length ? popular : gallery).slice(0, 3);

    return (
      <>
        <motion.h2 // Animasi untuk Judul Section
          className="text-3xl md:text-4xl font-bold mb-10 text-center text-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textUpVariants}
        >
          3 UMKM yang Kami Rekomendasikan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {pool.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex flex-col cursor-pointer border-2 border-gray-800" // Tambah border gelap
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardUpVariants} // Menggunakan varian card yang baru
              transition={{ delay: i * 0.2 }} // Menambahkan delay untuk urutan card
            >
              <div className="h-52 w-full relative overflow-hidden">
                <img
                  src={item.Gambar}
                  alt={item.Nama}
                  className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <motion.h3 // Animasi untuk Nama UMKM
                    className="font-bold text-lg mb-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={textUpVariants}
                  >
                    {item.Nama}
                  </motion.h3>
                  <motion.p // Animasi untuk Deskripsi
                    className="text-sm text-gray-700 line-clamp-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={textUpVariants}
                    transition={{ delay: 0.1 }} // Sedikit delay setelah nama
                  >
                    {item.Dheskripsi}
                  </motion.p>
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
          ))}
        </div>
      </>
    );
  })()}
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
          className="absolute top-0 left-0 h-full bg-[#ffef0f] z-10 rounded-md"
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
