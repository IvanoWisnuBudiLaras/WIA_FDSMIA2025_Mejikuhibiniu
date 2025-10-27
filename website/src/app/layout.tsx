"use client";

import "./globals.css";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden">
        <ReactLenis root>
          <main className="overflow-hidden">{children}</main>
        </ReactLenis>
      </body>
    </html>
  );
}
