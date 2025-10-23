"use client";
import Link from "next/link";
import { Transition } from "@/components/transtition";

// MAINTENANCE: Home page with enhanced transition animation
// Demonstrates various transition effects

export function HomePageTransition() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Transisi Halaman
        </h1>
        <p className="text-slate-600 mb-8">
          Pilih arah transisi untuk melihat efek menimbun halaman
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/Showcase" 
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <div className="text-lg font-semibold text-slate-800 mb-2">
              ⬅️ Slide Kiri
            </div>
            <p className="text-sm text-slate-600">
              Transisi menggelinding ke kiri
            </p>
          </Link>
          
          <Link 
            href="/Showcase" 
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <div className="text-lg font-semibold text-slate-800 mb-2">
              ➡️ Slide Kanan
            </div>
            <p className="text-sm text-slate-600">
              Transisi menggelinding ke kanan
            </p>
          </Link>
          
          <Link 
            href="/Showcase" 
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <div className="text-lg font-semibold text-slate-800 mb-2">
              ⬆️ Slide Atas
            </div>
            <p className="text-sm text-slate-600">
              Transisi menggelinding ke atas
            </p>
          </Link>
          
          <Link 
            href="/Showcase" 
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <div className="text-lg font-semibold text-slate-800 mb-2">
              ⬇️ Slide Bawah
            </div>
            <p className="text-sm text-slate-600">
              Transisi menggelinding ke bawah
            </p>
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-slate-800 text-white rounded-lg">
          <p className="text-sm">
            💡 Transisi sekarang menggunakan efek slide yang menutupi seluruh halaman
          </p>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Transition pageIndex={0}>
      <HomePageTransition />
    </Transition>
  );
}