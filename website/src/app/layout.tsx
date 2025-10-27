import "./globals.css";
import LenisProvider from "../components/LenisProvider";

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
      </body>
    </html>
  );
}
