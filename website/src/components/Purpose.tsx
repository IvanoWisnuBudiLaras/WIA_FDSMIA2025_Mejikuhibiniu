"use client";
import React from "react";
import { motion } from "framer-motion";

const goals = [
  { title: "Pamerkan Produk", detail: "Galeri produk yang mudah dinavigasi, foto berkualitas & deskripsi lengkap." },
  { title: "Hubungkan Pelanggan", detail: "CTA yang jelas: kontak, order, daftar reseller, integrasi maps." },
  { title: "Bina Komunitas", detail: "Fitur cerita & testimoni untuk membangun kepercayaan." },
];

export default function Purpose() {
  return (
    <section className="section" id="purpose">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="eyebrow">Tujuan</div>
          <h2>Tujuan Pembuatan Website</h2>
          <p className="text-gray-600 max-w-2xl">Menciptakan platform yang bukan hanya katalog; tetapi alat nyata untuk membantu UMKM bertumbuh.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((g, idx) => (
            <motion.div
              key={g.title}
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.14, duration: 0.5 }}
              className="card"
            >
              <h4 className="text-xl font-bold mb-2">{g.title}</h4>
              <p className="text-gray-600">{g.detail}</p>
              <div className="mt-4 flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition">Pelajari</button>
                <button className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition">Hubungi</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
