import "./globals.css";
import LenisProvider from "../components/LenisProvider";
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
        <LenisProvider>
          <main className="overflow-hidden">{children}</main>
        </LenisProvider>
        <PageTransition>
          <ReactLenis root>
          <main className="page-content overflow-hidden">{children}</main>
        </ReactLenis>
        </PageTransition>
      </body>
    </html>
  );
}
