"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ item, onClose }: {
  item: any | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-lg w-full p-4 space-y-3"
          >
            <img src={item.Gambar} alt={item.Nama} className="rounded-md w-full object-cover" />
            <h2 className="text-xl font-semibold">{item.Nama}</h2>
            <p className="text-gray-700 text-sm">{item.Dheskripsi}</p>
            <div className="flex justify-between text-sm text-blue-600 underline">
              <a href={item.Lokasi} target="_blank">Lokasi</a>
              <a href={item.Instagram} target="_blank">Instagram</a>
            </div>
            <button
              onClick={onClose}
              className="block mx-auto mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              Back
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
