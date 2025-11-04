"use client";
import "./globals.css";
import { Montserrat } from "next/font/google";
import PageTransition from "@/components/PageTranstion";
import { ReactLenis } from "@studio-freight/react-lenis";
import LenisProvider from "@/components/LenisProvider";

const metadata = {
  title: "TulungUsaha",
  description: "Best Indonesian UMKM Showcase",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden">
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