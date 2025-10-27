"use client";

import React, { Suspense, useEffect, useState } from "react";
import data from "../../data/Gallery.json";

// We try to detect whether react-three-fiber (and three) are available.
// If they are, we'll lazy-load the heavy R3F scene. If not, render a CSS fallback.

export default function LostGallery3DClient() {
  const [hasR3F, setHasR3F] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // dynamic check for @react-three/fiber
        await import("@react-three/fiber");
        // If import succeeds, mark available
        if (mounted) setHasR3F(true);
      } catch (err) {
        if (mounted) setHasR3F(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (hasR3F === null) {
    return <div className="absolute inset-0" />; // loading placeholder
  }

  if (hasR3F) {
    // Lazy-load the true R3F scene (keeps server safe)
    const R3FScene = React.lazy(() => import("./LostGallery3D.r3f"));
    return (
      <Suspense fallback={<div className="absolute inset-0" />}>
        <R3FScene data={data} />
      </Suspense>
    );
  }

  // Fallback: a CSS-based 2D parallax-style gallery that works without three/fiber.
  return (
    <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-6">
        <div className="relative h-[420px] overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-8 animate-scroll">
            {[...data, ...data].map((item, i) => (
              <div key={i} className="w-[360px] h-[420px] rounded-2xl overflow-hidden bg-gray-800">
                <img src={item.Gambar} alt={item.Nama} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
