import React from "react";
import Hero from "@/components/Hero";
import AboutPage from "@/components/About";
import FloatingGallery from "@/components/FloatingGallery";

export default function Page() {
  return (
    <main>
      <Hero />
      <FloatingGallery />
      <AboutPage />
    </main>
  );
}
