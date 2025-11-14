"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal2({
  item,
  rect,
  onClose,
}: {
  item: any | null;
  rect: DOMRect | null;
  onClose: () => void;
}) {
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (rect) {
      // Gunakan posisi absolut berdasarkan scroll halaman
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [rect]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && rect && (
        <>
          {/* Overlay gelap di belakang modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[998]"
          />

          {/* Modal muncul di posisi gambar yang diklik */}
          <motion.div
            className="absolute bg-white rounded-xl overflow-hidden shadow-2xl z-[999] border border-gray-200"
            initial={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              height: coords.height,
              opacity: 0,
            }}
            animate={{
              top: coords.top - coords.height * 0.25,
              left: coords.left - coords.width * 0.25,
              width: coords.width * 1.5,
              height: coords.height * 1.5,
              opacity: 1,
            }}
            exit={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              height: coords.height,
              opacity: 0,
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <img
                src={item.Gambar}
                alt={item.Nama}
                className="w-full h-[70%] object-cover"
              />
              <div className="p-3 overflow-y-auto max-h-[30%]">
                <h2 className="text-lg font-semibold">{item.Nama}</h2>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  {item.Dheskripsi}
                </p>
              </div>

              <button
                onClick={onClose}
                className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-gray-700 hover:bg-white transition"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
