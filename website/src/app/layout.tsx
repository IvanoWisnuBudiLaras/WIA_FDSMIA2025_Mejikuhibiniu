"use client";

import "./globals.css";
import { ReactLenis } from "@studio-freight/react-lenis";
import PageTransition from "@/components/Effect/PageTransition"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden">
        <PageTransition>
          <ReactLenis root>
          <main className="page-content overflow-hidden">{children}</main>
        </ReactLenis>
        </PageTransition>
        
      </body>
    </html>
  );
}
