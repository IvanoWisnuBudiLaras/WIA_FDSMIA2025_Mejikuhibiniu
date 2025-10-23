// src/app/layout.tsx
import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/Effect/PageTransition";


export const metadata: Metadata = {
  title: "UMKM Tulungagung Showcase",
  description: "Modern parallax scroll effect using Framer Motion + Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body className={` text-[var(--text-color)] antialiased`}>
        <PageTransition>
          <main className="page-content">{children}</main>
        </PageTransition>
      </body>
      
    </html>
  );
}
