"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/Gallery.json";

type Item = {
  Gambar: string;
  Nama: string;
  Deskripsi?: string;
  Lokasi?: string;
  Instagram?: string;
};

// Cinematic popup overlay component
const ShowcaseOverlay: React.FC<{
  item: Item | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Soft white backdrop with lens blur */}
        <div 
          className="absolute inset-0 bg-white/80" 
          style={{ 
            backdropFilter: 'blur(30px) brightness(1.2)',
            WebkitBackdropFilter: 'blur(30px) brightness(1.2)'
          }} 
        />

        {/* Popup content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-white/90 p-6 md:p-8 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Image */}
            <div className="w-full md:w-1/2 aspect-[3/2] relative rounded-xl overflow-hidden">
              <Image
                src={item.Gambar}
                alt={item.Nama}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-neutral-800">
              <h2 className="text-2xl font-semibold mb-4">{item.Nama}</h2>
              
              {item.Deskripsi && (
                <p className="mb-4 text-neutral-600">{item.Deskripsi}</p>
              )}
              
              {item.Lokasi && (
                <div className="mb-3">
                  <strong className="text-neutral-900">Lokasi:</strong>{' '}
                  <span className="text-neutral-600">{item.Lokasi}</span>
                </div>
              )}
              
              {item.Instagram && (
                <div className="mb-3">
                  <strong className="text-neutral-900">Instagram:</strong>{' '}
                  <a 
                    href={`https://instagram.com/${item.Instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {item.Instagram}
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function useRafLoop(cb: (dt: number) => void) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    function tick(time: number) {
      if (lastRef.current == null) lastRef.current = time;
      const dt = (time - lastRef.current) / 1000;
      lastRef.current = time;
      cb(dt);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [cb]);
}

function Row({
  items,
  rowIndex,
  speed = 30,
  direction = 1,
  orbitZ = 0,
  parallaxFactor = 1,
  lateralOffsetRef,
  onItemClick,
}: {
  items: Item[];
  rowIndex: number;
  speed?: number;
  direction?: number;
  orbitZ?: number;
  parallaxFactor?: number;
  lateralOffsetRef: React.MutableRefObject<number>;
  onItemClick: (item: Item) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startX = useRef(0);
  const baseScroll = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const targetScroll = useRef(0);
  const targetRot = useRef(0);
  const extended = [...items, ...items, ...items];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const singleSet = el.scrollWidth / 3 || 1;
      el.scrollLeft = singleSet;
      targetScroll.current = singleSet;
    });
  }, [items]);

  // RAF loop: auto-scroll and smoothing
  useRafLoop((dt) => {
    const el = containerRef.current;
    if (!el) return;
    const singleSet = el.scrollWidth / 3 || 1;

    if (!isInteracting) {
      const s = speed * (1 + rowIndex * 0.12) * direction;
      targetScroll.current += s * dt;
    }

    // wrap target within middle set
    if (targetScroll.current >= singleSet * 2) targetScroll.current -= singleSet;
    if (targetScroll.current <= singleSet * 0) targetScroll.current += singleSet;

    // smooth current scroll toward target
    const cur = el.scrollLeft;
    const next = cur + (targetScroll.current - cur) * Math.min(1, dt * 12);
    el.scrollLeft = next;

    // apply lateral parallax transform (in px) to the inner strip
    const inner = el.querySelector<HTMLDivElement>(".row-inner");
    if (inner) {
      // lateralOffsetRef supplies global cursor-driven offset in range [-1,1]
      const offset = lateralOffsetRef.current * parallaxFactor * (60 + rowIndex * 20);
      inner.style.transform = `translateX(${offset}px)`;
    }
  });

  // Pointer drag + wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pointerIdRef.current = e.pointerId;
      el.setPointerCapture?.(e.pointerId);
      startX.current = e.clientX;
      baseScroll.current = el.scrollLeft;
      setIsInteracting(true);
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      const dx = e.clientX - startX.current;
      targetScroll.current = baseScroll.current - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch {}
      pointerIdRef.current = null;
      setIsInteracting(false);
      el.style.cursor = "grab";
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    const onWheel = (e: WheelEvent) => {
      // If rows captured wheel (they call preventDefault), this won't fire.
      e.preventDefault();
      // sensitivity tweak
      const sensitivity = 0.15;
      targetRot.current += (e.deltaY || e.deltaX) * sensitivity;
    };
    el.addEventListener("wheel", onWheel as EventListener, { passive: false });

    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel as EventListener);
    };
  }, [isInteracting, speed, direction, rowIndex, lateralOffsetRef]);

  return (
    <div
      className="w-full overflow-hidden py-6"
      style={{ transformStyle: "preserve-3d", transform: `translateZ(${orbitZ}px)` }}
    >
      <div
        ref={containerRef}
        className="flex gap-6 items-center hide-scrollbar"
        style={{
          minWidth: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
          touchAction: "pan-y", // allow vertical page scroll but keep horizontal drag responsive
        }}
        aria-label={`showcase-row-${rowIndex}`}
      >
        <div className="flex items-center gap-6 row-inner" style={{ minWidth: "max-content", transition: "transform 0.35s linear" }}>
          {extended.map((it, i) => (
            <div
              key={`${rowIndex}-${i}-${it.Nama}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-lg relative cursor-pointer"
              style={{
                width: 320,
                height: 220,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              onClick={() => onItemClick(it)}
            >
              <div
                className="item-inner"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `translateZ(${5 * rowIndex}px) rotateY(${(i % 2 ? 2 : -2) * rowIndex}deg)`,
                  transition: "transform 0.5s ease-out",
                }}
              >
                <Image src={it.Gambar} alt={it.Nama} width={320} height={220} className="object-cover w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const allItems = (data as Item[]) || [];
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const chunkSize = Math.max(5, Math.ceil(allItems.length / 3));
  const rows: Item[][] = [
    allItems.slice(0, chunkSize),
    allItems.slice(chunkSize, chunkSize * 2),
    allItems.slice(chunkSize * 2),
  ];
  for (let i = 0; i < rows.length; i++) {
    while (rows[i].length < chunkSize) rows[i] = rows[i].concat(rows[i]);
    rows[i] = rows[i].slice(0, chunkSize);
  }

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const targetRot = useRef(0);
  const currentRot = useRef(0);
  const targetTilt = useRef(0);
  const currentTilt = useRef(0);

  // global lateral offset driven by cursor X pos in range [-1,1]
  const lateralOffset = useRef(0);
  const targetLateral = useRef(0);

  useEffect(() => {
    const el = sceneRef.current || window;

    const onWheel = (e: WheelEvent) => {
      // give rotation feel
      e.preventDefault();
      const sensitivity = 0.15;
      targetRot.current += (e.deltaY || e.deltaX) * sensitivity;
    };

    // pointer / mouse move to drive tilt and lateral offset
    const onPointerMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1; // -1..1
      const ny = (e.clientY / h) * 2 - 1; // -1..1
      // tilt: tilt up/down based on Y
      const maxTilt = 12;
      targetTilt.current = -ny * maxTilt;
      // lateral: how much rows shift horizontally by cursor
      targetLateral.current = clamp(nx, -1, 1);
    };

    // touch support
    let lastTouchY: number | null = null;
    const onTouchStart = (ev: TouchEvent) => {
      lastTouchY = ev.touches?.[0]?.clientY ?? null;
    };
    const onTouchMove = (ev: TouchEvent) => {
      if (lastTouchY == null) lastTouchY = ev.touches?.[0]?.clientY ?? null;
      const y = ev.touches?.[0]?.clientY ?? 0;
      const dy = lastTouchY - y;
      lastTouchY = y;
      targetRot.current += dy * 0.5;
    };

    (el as Element | Window).addEventListener?.("wheel", onWheel as EventListener, { passive: false });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true } as any);
    window.addEventListener("touchmove", onTouchMove, { passive: false } as any);

    return () => {
      (el as Element | Window).removeEventListener?.("wheel", onWheel as EventListener);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
    };
  }, []);

  // RAF smoothing for scene transform and global lateral offset
  useRafLoop((dt) => {
    const el = sceneRef.current;
    if (!el) return;

    currentRot.current = lerp(currentRot.current, targetRot.current, clamp(dt * 6, 0, 1));
    currentTilt.current = lerp(currentTilt.current, targetTilt.current, clamp(dt * 8, 0, 1));
    lateralOffset.current = lerp(lateralOffset.current, targetLateral.current, clamp(dt * 8, 0, 1));

    // small damp of targetRot to slowly settle (avoid runaway)
    targetRot.current *= 0.995;

    el.style.transform = `rotateY(${currentRot.current}deg) rotateX(${currentTilt.current}deg)`;
  });

  return (
    <main style={{ overflow: "hidden" }} className="min-h-screen w-screen bg-[var(--BackgroundColor)] text-[var(--TextColor)]">
      <style jsx global>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        /* subtle perspective + preserve */
        .scene-perspective { perspective: 1100px; perspective-origin: 50% 40%; }
        .item-inner img { display: block; }
      `}</style>

      <header className="px-6 py-8">
        <h1 className="text-3xl font-bold">Showcase (Orbit) — 3D Parallax</h1>
        <p className="text-sm text-gray-600">Drag any row, scroll the page, or move the cursor to shift rows (parallax).</p>
      </header>

      <section className="px-6 pb-12">
        <div
          ref={sceneRef}
          className="w-full relative will-change-transform transition-transform duration-75 scene-perspective"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div style={{ transform: "translateZ(-260px)" }}>
            <Row items={rows[0]} rowIndex={0} speed={18} direction={1} orbitZ={-260} parallaxFactor={1.2} lateralOffsetRef={lateralOffset} onItemClick={setSelectedItem} />
          </div>
          <div style={{ transform: "translateZ(-80px)" }}>
            <Row items={rows[1]} rowIndex={1} speed={28} direction={-1} orbitZ={-80} parallaxFactor={1.0} lateralOffsetRef={lateralOffset} onItemClick={setSelectedItem} />
          </div>
          <div style={{ transform: "translateZ(60px)" }}>
            <Row items={rows[2]} rowIndex={2} speed={14} direction={1} orbitZ={60} parallaxFactor={0.7} lateralOffsetRef={lateralOffset} onItemClick={setSelectedItem} />
          </div>

          {/* Popup overlay */}
          {selectedItem && <ShowcaseOverlay item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
      </section>
    </main>
  );
}
