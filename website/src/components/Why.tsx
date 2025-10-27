"use client";
import React from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Visibilitas Lokal",
    desc: "UMKM sering kesulitan ditemukan — website ini membantu menampilkan produk & profil secara profesional.",
  },
  {
    title: "Digital Presence",
    desc: "Memberi kredibilitas dan akses 24/7 bagi calon pelanggan.",
  },
  {
    title: "Pengembangan Ekonomi",
    desc: "Mempermudah pemilik UMKM menjangkau pasar baru dan berkolaborasi.",
  },
];

export default function Why() {
  return (
    <section className="section bg-[linear-gradient(180deg,#f8fafc,transparent)]" id="why">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="eyebrow">Kenapa</div>
          <h2>Kenapa website ini dibuat</h2>
          <p className="text-gray-600 max-w-2xl">Desain lembut dan fokus pada storytelling produk untuk membantu UMKM tampil percaya diri di dunia digital.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{r.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{r.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
