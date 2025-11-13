"use client";
import "./globals.css";
import { GrandBold } from "@/lib/Fonts";
import PageTransition from "@/components/PageTranstion";
import { ReactLenis } from "@studio-freight/react-lenis";
import LenisProvider from "@/components/LenisProvider";

const metadata = {
  title: "TulungUsaha",
  description: "Best Indonesian UMKM Showcase",
};

const grandBold = GrandBold;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${grandBold.className} overflow-x-hidden`}>
        <PageTransition>
          <LenisProvider>
            <ReactLenis root>
              <main>{children}</main>
            </ReactLenis>
          </LenisProvider>
        </PageTransition>
      </body>
   </html>
  );
}