import React from "react";
import Hero from "@/components/Hero";
import AboutPage from "@/app/about/page";
import SmoothScroll from "@/components/SmoothScroll";

import "./globals.css";

export const metadata = {
  title: "UMKM Showcase",
  description: "Landing page UMKM dengan parallax & desain Awwwards-inspired",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <SmoothScroll />
      <AboutPage />
    </main>
  );
}
