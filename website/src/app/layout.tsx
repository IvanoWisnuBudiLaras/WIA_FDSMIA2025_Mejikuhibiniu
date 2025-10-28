"use client";
import "./globals.css";
import PageTransition from "@/components/Effect/PageTransition";
import { ReactLenis } from "@studio-freight/react-lenis";
import LenisProvider from "../components/LenisProvider";

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
              <main className="overflow-hidden">{children}</main>
            </ReactLenis>
          </LenisProvider>
        </PageTransition>
      </body>
    </html>
  );
}
