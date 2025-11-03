"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ onSearch, onFilter }: {
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/40 backdrop-blur-md flex justify-between items-center px-4 py-2">
      <Link href="/" className="font-semibold text-gray-800">← Back</Link>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        className="w-1/2 max-w-md rounded-md border border-gray-300 px-3 py-1 focus:outline-none"
      />

      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          onFilter(e.target.value);
        }}
        className="rounded-md border border-gray-300 px-3 py-1 bg-white"
      >
        <option value="">All</option>
        <option value="Kuliner">Kuliner</option>
        <option value="Fashion">Fashion</option>
        <option value="Lainnya">Lainnya</option>
      </select>
    </header>
  );
}
