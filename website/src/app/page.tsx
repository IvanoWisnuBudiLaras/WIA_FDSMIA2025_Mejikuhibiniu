import React from "react";
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import Purpose from "@/components/Purpose";
import "./globals.css";

export const metadata = {
  title: "UMKM Showcase",
  description: "Landing page UMKM dengan parallax & desain Awwwards-inspired",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Why />
      <Purpose />
    </main>
  );
}
