import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalScroll from "@/components/HorizontalScroll";

import "./globals.css";

export const metadata = {
  title: "UMKM Showcase",
  description: "Landing page UMKM dengan parallax & desain Awwwards-inspired",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <HorizontalScroll />
      
    </main>
  );
}
