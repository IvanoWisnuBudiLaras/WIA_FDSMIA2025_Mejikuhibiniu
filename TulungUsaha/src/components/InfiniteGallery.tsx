"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/Gallery.json";

interface GalleryItem {
  No: number;
  Gambar: string;
  Nama: string;
  Dheskripsi: string;
  Instagram: string;
  Lokasi: string;
  Kategori: string;
  POPULER?: string;
}

interface InfiniteGalleryProps {
  searchTerm?: string;
  selectedCategory?: string;
}

const InfiniteGallery = forwardRef((props: InfiniteGalleryProps, ref) => {
  const { searchTerm = "", selectedCategory = "" } = props;
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(data);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    search: (term: string) => {
      // Handle search logic if needed
    },
    filterByCategory: (category: string) => {
      // Handle filter logic if needed
    }
  }));

  useEffect(() => {
    let filtered = [...data]; // Clone data array to avoid mutation

    if (selectedCategory && selectedCategory !== "Semua") {
      filtered = filtered.filter(item => item.Kategori === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.Nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Dheskripsi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-stone-50 showcase-gallery">
      {/* Gallery Grid dengan gaya artistik seperti 100lostspecies */}
      <div className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.No}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.No)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(item)}
              >
                {/* Card dengan efek artistik yang dioptimalkan */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-stone-100">
                    <img
                      src={item.Gambar}
                      alt={item.Nama}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    
                    {/* Overlay gradient yang lebih halus */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    
                    {/* Border yang lebih halus */}
                    <div className="absolute inset-0 border border-stone-200 group-hover:border-stone-400 transition-colors duration-300 ease-out" />
                  </div>
                  
                  {/* Informasi dengan gaya minimalis yang lebih baik */}
                  <div className="mt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-light text-stone-800 group-hover:text-stone-900 transition-colors duration-200 tracking-wide">
                        {item.Nama}
                      </h3>
                      <span className="px-2 py-1 bg-stone-100 text-stone-500 text-xs rounded-full font-light tracking-wider ml-2">
                        {item.Kategori}
                      </span>
                    </div>
                    
                    <p className="text-stone-400 text-sm leading-relaxed font-light line-clamp-2">
                      {item.Dheskripsi}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div 
              className="text-center py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-stone-400 text-lg font-light">No results found</p>
              <p className="text-stone-300 text-sm mt-2">Try adjusting your search or filter</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal dengan gaya artistik yang dioptimalkan */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-none max-w-5xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 h-full">
                <div className="aspect-square md:aspect-auto">
                  <img
                    src={selectedItem.Gambar}
                    alt={selectedItem.Nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-12 overflow-y-auto">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-4xl font-thin text-stone-800 mb-2 tracking-tight">
                        {selectedItem.Nama}
                      </h2>
                      <span className="inline-block px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-light tracking-wide">
                        {selectedItem.Kategori}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-stone-400 hover:text-stone-600 text-3xl font-light transition-colors duration-200"
                    >
                      ×
                    </button>
                  </div>
                  
                  <p className="text-stone-500 leading-relaxed mb-8 font-light text-lg">
                    {selectedItem.Dheskripsi}
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href={selectedItem.Instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-stone-600 hover:text-stone-800 transition-colors font-light group"
                    >
                      <span className="mr-3 group-hover:translate-x-1 transition-transform duration-200">→</span>
                      View on Instagram
                    </a>
                    
                    <a
                      href={selectedItem.Lokasi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-stone-600 hover:text-stone-800 transition-colors font-light group"
                    >
                      <span className="mr-3 group-hover:translate-x-1 transition-transform duration-200">→</span>
                      View Location
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

InfiniteGallery.displayName = "InfiniteGallery";

export default InfiniteGallery;