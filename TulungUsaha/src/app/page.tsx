import React from "react";
import Hero from "@/components/hero";
import AboutPage from "@/components/about";
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
