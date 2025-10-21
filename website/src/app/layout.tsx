// src/app/layout.tsx
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framer Parallax | Next 15",
  description: "Modern parallax scroll effect using Framer Motion + Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
