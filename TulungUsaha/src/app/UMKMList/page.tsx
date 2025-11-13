"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import InfiniteGallery from "@/components/InfiniteGallery";

export default function ShowcasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const galleryRef = useRef<any>(null);

  const categories = ["Semua", "Kuliner", "Fashion", "Kerajinan", "Jasa"];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header dengan gaya minimalis seperti 100lostspecies */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-thin text-stone-800 tracking-wide">Showcase</h1>
              <p className="text-stone-500 text-sm mt-1 font-light">Discover our curated collection</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-none focus:outline-none focus:border-stone-400 transition-colors duration-200 w-full sm:w-64 text-stone-700 placeholder-stone-400 font-light"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-4 py-2 text-sm rounded-none transition-all duration-200 font-light ${
                      selectedCategory === category
                        ? "bg-stone-800 text-white border-stone-800"
                        : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section dengan gaya artistik yang dioptimalkan */}
      <motion.section 
        className="px-8 py-16 bg-gradient-to-b from-stone-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-thin text-stone-800 mb-6 tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Curated Collection
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore our carefully selected showcase of exceptional work, 
            each piece telling its own unique story through craftsmanship and creativity.
          </motion.p>
        </div>
      </motion.section>

      {/* InfiniteGallery dengan props yang diperbaiki */}
      <InfiniteGallery 
        ref={galleryRef}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}