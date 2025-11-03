"use client";

import Header from "@/components/Header";
import InfiniteGallery from "@/components/InfiniteGallery";
import { useRef } from "react";

export default function Page() {
  const galleryRef = useRef<any>(null);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header
        onSearch={(term) => galleryRef.current?.handleSearch(term)}
        onFilter={(cat) => galleryRef.current?.handleFilter(cat)}
      />
      <InfiniteGallery ref={galleryRef} />
    </main>
  );
}
