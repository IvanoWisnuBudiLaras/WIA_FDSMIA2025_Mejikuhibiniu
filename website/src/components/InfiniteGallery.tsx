"use client";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import data from "@/data/Gallery.json";
import Modal from "./Modal";

const InfiniteGallery = forwardRef((props, ref) => {
  const [filtered, setFiltered] = useState(data);
  const [selected, setSelected] = useState<any | null>(null);

  // expose search & filter ke header
  useImperativeHandle(ref, () => ({
    handleSearch,
    handleFilter,
  }));

  // fungsi search
  function handleSearch(term: string) {
    const lower = term.toLowerCase().trim();
    if (!lower) setFiltered(data);
    else setFiltered(data.filter((item) => item.Nama.toLowerCase().includes(lower)));
  }

  // fungsi filter
  function handleFilter(category: string) {
    if (!category) setFiltered(data);
    else setFiltered(data.filter((item) => item.Kategori === category));
  }

  // === LOOP SETUP ===
  const makeRow = (arr: any[]) => [...arr, ...arr, ...arr]; // 3x duplikasi untuk seamless loop
  const rows = [
    makeRow(filtered.slice(0, 8)),
    makeRow(filtered.slice(8, 17)),
    makeRow(filtered.slice(17, 25)),
  ];

  // drag mechanics (pakai framer motion drag)
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const x3 = useMotionValue(0);

  // Fungsi untuk looping visual — kalau sudah jauh geser, reset posisi biar terus muter
  const loopPosition = (x: any) => {
    const limit = 800; // batas jarak sebelum di-reset
    if (x.get() < -limit) x.set(0);
    if (x.get() > limit) x.set(0);
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col gap-10 pt-24">
      {[x1, x2, x3].map((xVal, i) => (
        <motion.div
          key={i}
          style={{ x: xVal }}
          drag="x"
          dragElastic={0.05}
          dragMomentum={true}
          onUpdate={() => loopPosition(xVal)}
          className="flex gap-6 justify-center"
        >
          {rows[i].map((item, idx) => (
            <motion.img
              key={`${item.No}-${idx}`}
              src={item.Gambar}
              alt={item.Nama}
              onClick={() => setSelected(item)}
              className="w-64 h-64 object-cover rounded-xl cursor-pointer select-none shadow-md"
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </motion.div>
      ))}

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center text-xl font-semibold py-20">
          Tidak ada hasil yang cocok.
        </p>
      )}

      <AnimatePresence>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
});

export default InfiniteGallery;
