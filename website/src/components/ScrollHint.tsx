"use client";
import { motion } from "framer-motion";

export default function ScrollHint() {
  return (
    <div className="fixed bottom-6 right-8 flex flex-col items-center space-y-1">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center text-lg"
      >
        ↓
      </motion.div>
      <span className="text-xs text-gray-600">Scroll</span>
    </div>
  );
}
