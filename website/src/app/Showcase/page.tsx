"use client";

import Image from "next/image";
import React from 'react'
import umkmData from '../../data/umkmData.json';

export default function Showcase() {
  // Data UMKM Tulungagung - showcase profil usaha
  const { umkmList } = umkmData;
  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Showcase UMKM Tulungagung</h1>
        <div className="flex gap-4 justify-center mb-8">
          <input 
            type="search" 
            placeholder="Cari UMKM berdasarkan nama atau kategori..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Cari
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {umkmList.map((umkm) => (
          <div key={umkm.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <Image 
              src={umkm.gambar} 
              alt={umkm.nama}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {umkm.kategori}
                </span>
                <span className="text-sm text-gray-500">{umkm.tahunBerdiri}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{umkm.nama}</h3>
              <p className="text-gray-600 mb-4">{umkm.deskripsi}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {umkm.lokasi}
              </div>
              <button className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                Lihat Detail UMKM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}