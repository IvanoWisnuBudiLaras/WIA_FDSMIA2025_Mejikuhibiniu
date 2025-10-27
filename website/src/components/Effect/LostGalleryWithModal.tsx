"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import data from "../../data/Gallery.json";

export default function LostGalleryWithModal() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // modal state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // quick access to active item
  const activeItem = activeIndex !== null ? data[activeIndex % data.length] : null;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const timeline = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    const fullW = track.scrollWidth / 2;
    const speed = 45;
    timeline.to(track, { x: `-=${fullW / 2}px`, duration: speed });
    
    // cleanup harus void function, bukan return timeline
    return () => {
      timeline.kill();
    };
  }, []);


  // disable page scroll when modal active
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.style.overflow = activeIndex !== null ? "hidden" : "";
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
  }, [activeIndex]);

  // helper: close modal
  const closeModal = () => {
    setActiveIndex(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("gallery:reset"));
    }
  };

  return (
    <section ref={rootRef} className="relative w-screen h-screen bg-neutral-900 text-white overflow-hidden">
      {/* cinematic edge gradients */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* horizontal track (duplicated once to create illusion) */}
      <div
        ref={trackRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-10 px-[20vw] items-center will-change-transform z-10"
      >
        {[...data, ...data].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[380px] h-[480px] rounded-3xl overflow-hidden cursor-pointer relative"
            onClick={() => setActiveIndex(i)} // use i so duplicates map back to data using modulo
            role="button"
            aria-label={`Open ${item.Nama}`}
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <Image
                src={item.Gambar}
                alt={item.Nama}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 380px"
                priority={i < 2} // preload first items
              />
            </div>

            {/* small overlay text */}
            <div className="absolute bottom-4 left-4 right-4 text-left z-20">
              <div className="bg-black/40 backdrop-blur rounded-md p-2">
                <h3 className="text-sm font-semibold">{item.Nama}</h3>
                <p className="text-xs text-gray-200/80">{item.Kategori}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- MODAL ---------- */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* backdrop: blur everything behind modal but not the modal content itself */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            data-testid="modal-backdrop"
          />

          {/* modal card (centered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            className="relative z-60 max-w-[1100px] w-[92vw] max-h-[86vh] bg-transparent"
            onClick={(e) => e.stopPropagation()} // don't close when clicking modal interior
          >
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-white/5 to-black/30">
              {/* left: image (kept sharp) */}
              <div className="w-full md:w-[48%] h-[48vh] md:h-auto bg-neutral-800 relative">
                <Image
                  src={activeItem.Gambar}
                  alt={activeItem.Nama}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 48vw, 480px"
                />
                {/* small overlay name */}
                <div className="absolute left-4 bottom-4 bg-black/40 backdrop-blur px-3 py-2 rounded">
                  <h3 className="text-white font-bold">{activeItem.Nama}</h3>
                </div>
              </div>

              {/* right: scrollable content */}
              <div className="w-full md:w-[52%] max-h-[48vh] md:max-h-[70vh] overflow-y-auto bg-white/5 p-6">
                {/* Description */}
                <section className="mb-6">
                  <h4 className="text-sm text-gray-300 uppercase tracking-wide">Deskripsi</h4>
                  <p className="mt-2 text-gray-100 text-sm leading-relaxed whitespace-pre-line">
                    {activeItem.Dheskripsi}
                  </p>
                </section>

                {/* Maps preview & link */}
                <section className="mb-6">
                  <h4 className="text-sm text-gray-300 uppercase tracking-wide">Lokasi</h4>
                  <div className="mt-3 rounded overflow-hidden border border-white/10">
                    {/* small clickable map preview: we just show the same image area with a maps icon */}
                    <a
                      href={activeItem.Lokasi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative w-full h-[160px] bg-gray-800"
                    >
                      {/* overlay text/icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                        <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                        </svg>
                      </div>
                    </a>
                    <div className="p-3 bg-black/20">
                      <a
                        className="text-sm text-blue-200 underline"
                        href={activeItem.Lokasi}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buka di Google Maps
                      </a>
                    </div>
                  </div>
                </section>

                {/* Contact */}
                <section className="mb-6">
                  <h4 className="text-sm text-gray-300 uppercase tracking-wide">Contact</h4>
                  <div className="mt-3 flex items-center gap-4">
                    <a
                      href={activeItem.Instagram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 rounded hover:bg-white/10 transition"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-100">Instagram</span>
                    </a>

                    {/* copy Lokasi button */}
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(activeItem.Lokasi);
                        // small feedback
                        gsap.to(".copy-toast", { autoAlpha: 1, y: -8, duration: 0.3, ease: "power2.out" });
                        setTimeout(() => gsap.to(".copy-toast", { autoAlpha: 0, y: 0, duration: 0.3 }), 1200);
                      }}
                      className="px-3 py-2 bg-white/5 rounded hover:bg-white/10 transition text-sm"
                    >
                      Salin Link Lokasi
                    </button>
                  </div>

                  <div className="copy-toast fixed bottom-8 right-8 bg-black/80 text-white px-3 py-2 rounded opacity-0 pointer-events-none">
                    Disalin ke clipboard
                  </div>
                </section>

                {/* Back button */}
                <div className="mt-2">
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 hover:bg-white/12 rounded text-sm"
                  >
                    ← Kembali
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
