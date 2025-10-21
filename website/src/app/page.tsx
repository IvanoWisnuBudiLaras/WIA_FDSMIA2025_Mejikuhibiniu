// src/app/page.tsx
import Parallax from "@/components/parallax";


export default function Home() {
  return (
    <main>
      <Parallax />
      <section className="h-[100vh] flex items-center justify-center bg-black text-gray-400 text-xl">
        <p>Scroll down to see the parallax effect.</p>
      </section>
    </main>
  );
}
