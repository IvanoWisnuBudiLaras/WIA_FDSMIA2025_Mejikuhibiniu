"use client";

import React from "react";
import Image from "next/image";
import umkmData from "../../data/umkmData.json";

export default function Detailed() {
  const { umkmList } = umkmData;
  
  if (!umkmList || umkmList.length === 0) {
    return <div className="flex justify-center items-center h-screen">Data UMKM tidak tersedia</div>;
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-center items-center p-6">
                <Image
                    src={umkmList[0].gambar}
                    alt={umkmList[0].nama}
                    width={400}
                    height={250}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{umkmList[0].nama}</h1>
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {umkmList[0].kategori}
                    </span>
                    <span className="text-gray-600">
                        Berdiri sejak: {umkmList[0].tahunBerdiri}
                    </span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {umkmList[0].lokasi}
                </div>
                <p className="text-gray-700 leading-relaxed">{umkmList[0].deskripsi}</p>
            </div>
        </div>
    </div>
  );
}