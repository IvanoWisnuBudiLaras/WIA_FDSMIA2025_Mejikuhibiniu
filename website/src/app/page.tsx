"use client";
import Contact from "@/components/Effect/FontAnimated";
import "./globals.css";
import Nav from "@/components/Nav";
 
export default function HomePage() {
  return (
    <> 
    
    <Nav />  
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-[var(--Text-color)]">
          Selamat Datang di{" "}
          <a className=" hover:underline text-[var(--Text-color)]">UMKM Tulungagung Showcase!</a>
        </h1>
        <p className="mt-3 text-2xl text-[var(--Text-color)]">
          Jelajahi berbagai profil usaha mikro, kecil, dan menengah di Tulungagung.
        </p>
      </div>
    </div>      
       </>
  );
}