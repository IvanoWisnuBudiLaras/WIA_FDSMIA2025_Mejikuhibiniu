# Penjelasan Mendalam: Showcase 3D Orbit Gallery

## 1. Tujuan Komponen

Showcase 3D Orbit Gallery adalah komponen React yang menciptakan ilusi kedalaman 3D tanpa menggunakan engine 3D seperti Three.js. Komponen ini menunjukkan bagaimana CSS transforms dan DOM manipulation bisa menciptakan efek visual yang mengesankan.

Kunci utamanya:
- Menggunakan CSS `transform: translateZ()` dan `rotateY()` untuk menciptakan ilusi kedalaman
- Memanfaatkan `perspective` dan `preserve-3d` untuk efek parallax
- Menggabungkan scroll inertia dan pointer tracking untuk interaksi alami

## 2. Struktur File

### Direktif dan Import
```tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/Gallery.json";
```
- `"use client"` menandakan ini komponen Client-side
- `Image` dari Next.js untuk optimasi gambar otomatis
- `motion` dan `AnimatePresence` untuk animasi smooth
- `data` berisi informasi galeri dari JSON

### Type Definition
```tsx
type Item = {
  Gambar: string;
  Nama: string;
  Deskripsi?: string;
  Lokasi?: string;
  Instagram?: string;
};
```
Mendefinisikan struktur data untuk setiap item galeri.

### ShowcaseOverlay Component
Komponen popup cinematic yang muncul saat gambar diklik:
- Background blur dengan efek frosted glass
- Animasi smooth saat muncul/hilang
- Layout responsive dengan grid/flex
- Social media links

### Utility Functions
```tsx
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
```
- `clamp`: Membatasi nilai dalam range
- `lerp`: Linear interpolation untuk smoothing

### useRafLoop Custom Hook
```tsx
function useRafLoop(cb: (dt: number) => void) {
  // ... implementation
}
```
Hook khusus untuk animation loop berbasis requestAnimationFrame.

### Row Component
Komponen untuk setiap baris orbit:
- Scroll infinite dengan duplikasi item
- Efek parallax berdasarkan posisi kursor
- Interaksi drag dan momentum
- Transform 3D per item

### Page Component
Komponen utama yang mengatur:
- Global scene rotation dan tilt
- Lateral offset untuk parallax
- State management untuk popup
- Event handling global

## 3. Penjelasan Dinamika Visual

### Auto-Scroll Behavior
```tsx
if (!isInteracting) {
  const s = speed * (1 + rowIndex * 0.12) * direction;
  targetScroll.current += s * dt;
}
```
- Setiap row bergerak otomatis dengan kecepatan berbeda
- Speed meningkat sesuai index row (0.12 increment)
- Arah bergantian (direction: 1 atau -1)

### Parallax Effect
```tsx
const offset = lateralOffsetRef.current * parallaxFactor * (60 + rowIndex * 20);
inner.style.transform = `translateX(${offset}px)`;
```
- Offset lateral berdasarkan posisi kursor
- Factor parallax berbeda per row
- Semakin jauh row, semakin kecil parallax

### Depth Illusion
```tsx
style={{ 
  transform: `translateZ(${orbitZ}px)`,
  transformStyle: "preserve-3d"
}}
```
- Row depan: orbitZ positif (lebih dekat)
- Row belakang: orbitZ negatif (lebih jauh)
- preserve-3d menjaga hierarchi 3D

## 4. Logika Interaksi

### Wheel Scroll Rotation
```tsx
const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  const sensitivity = 0.15;
  targetRot.current += (e.deltaY || e.deltaX) * sensitivity;
};
```
- Scroll wheel memutar scene global
- Sensitivity dikontrol untuk feel yang pas
- Inertia ditambahkan via lerp

### Touch & Pointer
```tsx
const onPointerMove = (e: PointerEvent) => {
  const nx = (e.clientX / w) * 2 - 1; // -1..1
  const ny = (e.clientY / h) * 2 - 1; // -1..1
  targetTilt.current = -ny * maxTilt;
  targetLateral.current = clamp(nx, -1, 1);
};
```
- Tilt berdasarkan posisi Y cursor
- Lateral offset dari posisi X
- Range dinormalisasi ke -1..1

### Popup Management
```tsx
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
// ...
onClick={() => onItemClick(it)}
```
- State untuk item yang sedang dipilih
- Popup muncul saat item diklik
- AnimatePresence untuk transisi smooth

## 5. Penjelasan Desain Visual

### Backdrop Effect
```tsx
<div 
  className="absolute inset-0 bg-white/80" 
  style={{ 
    backdropFilter: 'blur(30px) brightness(1.2)',
    WebkitBackdropFilter: 'blur(30px) brightness(1.2)'
  }} 
/>
```
- White overlay dengan opacity 80%
- Blur 30px untuk efek cinematic
- Brightness boost untuk kontras

### Animation Springs
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ type: "spring", damping: 25, stiffness: 400 }}
>
```
- Spring physics untuk feel alami
- Scale + fade untuk depth
- Damping dan stiffness dioptimasi

## 6. Interaksi Data

### Data Loading
```tsx
const allItems = (data as Item[]) || [];
const chunkSize = Math.max(5, Math.ceil(allItems.length / 3));
const rows: Item[][] = [/*...*/];
```
- Data dari JSON dibagi ke 3 row
- Minimal 5 item per row
- Auto-duplicate jika kurang

### Item Detail
```tsx
{item.Deskripsi && (
  <p className="mb-4 text-neutral-600">{item.Deskripsi}</p>
)}
```
- Display kondisional untuk optional fields
- Social links aktif ke Instagram
- Styling konsisten untuk readability

## 7. Tips Optimasi

### Image Optimization
```tsx
<Image
  src={it.Gambar}
  alt={it.Nama}
  width={320}
  height={220}
  className="object-cover w-full h-full"
/>
```
- Next.js Image untuk auto-optimization
- Explicit dimensions untuk CLS
- object-cover untuk aspect ratio

### Performance
```tsx
className="will-change-transform"
style={{ transform: `translateZ(${orbitZ}px)` }}
```
- will-change hint untuk browser
- Hardware acceleration via transform
- Lazy state updates via useRef

## 8. Contoh Comment di Kode

```tsx
// Scene container with perspective
<div className="scene-perspective">
  {/* Each row has different Z-depth for 3D effect */}
  <div style={{ transform: "translateZ(-260px)" }}>
    <Row /* props */ />
  </div>
  {/* Middle row is closer to camera */}
  <div style={{ transform: "translateZ(-80px)" }}>
    <Row /* props */ />
  </div>
  {/* Front row appears closest */}
  <div style={{ transform: "translateZ(60px)" }}>
    <Row /* props */ />
  </div>
</div>
```

## 9. Insight Teknis

### 3D Tanpa WebGL
- CSS 3D transforms jauh lebih ringan dari WebGL
- Performa lebih baik di mobile
- Tidak perlu load 3D engine besar

### Preserve-3D vs Three.js
- preserve-3d menjaga hirarki transform
- Lebih sederhana dari scene graph 3D
- Terbatas tapi cukup untuk efek ini

### useRafLoop vs useEffect
- Lebih presisi untuk animasi
- Delta time untuk smooth motion
- Cleanup otomatis saat unmount

## 10. Kesimpulan

Showcase 3D Orbit Gallery mendemonstrasikan bahwa:
- Efek 3D bisa dicapai tanpa engine 3D
- CSS transforms + React hooks = UX menarik
- Performa tetap bagus di mobile

Untuk menambah/modifikasi:
1. Tambah data di Gallery.json
2. Sesuaikan jumlah row di Page component
3. Tweak nilai transform untuk efek berbeda

Tips akhir:
- Main dengan nilai translateZ
- Eksperimen dengan parallax factor
- Coba speed dan direction berbeda
- Test di berbagai device