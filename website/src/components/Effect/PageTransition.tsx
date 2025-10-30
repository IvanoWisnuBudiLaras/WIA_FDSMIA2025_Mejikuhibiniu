"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [transitionText, setTransitionText] = useState("");
  const isTransitioning = useRef(false);
  const hasPlayedInitial = useRef(false);
  const prevPath = useRef<string | null>(null);

  const getTextForPath = (path: string) => {
    if (path === "/Showcase") return "Showcase";
    return "";
  };

  // Animasi keluar halaman
  const exitPage = (url: string) => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    setTransitionText(getTextForPath(url));
    overlay.style.pointerEvents = "auto";

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => router.push(url),
    });

    // Mulai dari bawah berbentuk oval
    tl.set(overlay, {
      y: "100%",
      scaleX: 1,
      scaleY: 1,
      borderRadius: "10% / 90%",
      opacity: 1,
      zIndex: 9999,
    });
    tl.set(text, { opacity: 0, scale: 0.95 });

    tl.to(".page-content", { opacity: 0, duration: 0.3 }, 0);

    // Naik dan menutupi layar penuh (jadi background penuh)
    tl.to(
      overlay,
      {
        y: "0%",
        scaleX: 1,
        scaleY: 1,
        borderRadius: "0%",
        duration: 0.9,
      },
      0
    );

    // Munculkan teks di tengah
    tl.to(text, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.3");
  };

  // Animasi masuk halaman
  const playEntry = (isRouteChange: boolean) => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        isTransitioning.current = false;
        prevPath.current = pathname;
        gsap.to(overlay, { opacity: 0, duration: 0.6, delay: 0.3 });
        overlay.style.pointerEvents = "none";
      },
    });

    if (isRouteChange) {
      // Hilang ke atas, jadi oval lagi
      tl.to(text, { opacity: 0, scale: 0.95, duration: 0.3 }, 0);
      tl.to(
        overlay,
        {
          y: "100%",
          scaleX: 1,
          scaleY: 1,
          borderRadius: "10% / 90%",
          duration: 0.9,
        },
        "-=0.1"
      );
    }

    tl.to(".page-content", { opacity: 1, duration: 0.6 }, "-=0.3");
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='/']") as HTMLAnchorElement | null;
      if (!link) return;

      const url = new URL(link.href, window.location.origin).pathname;
      if (url === pathname || isTransitioning.current) return;

      e.preventDefault();
      isTransitioning.current = true;
      hasPlayedInitial.current = false;
      exitPage(url);
    };

    const links = document.querySelectorAll("a[href^='/']") as NodeListOf<HTMLAnchorElement>;
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, [pathname, router]);

  useEffect(() => {
    if (hasPlayedInitial.current && !isTransitioning.current) return;
    const isRouteChange = prevPath.current !== null;
    playEntry(isRouteChange);
    hasPlayedInitial.current = true;
  }, [pathname]);

  useEffect(() => {
    setTransitionText(getTextForPath(pathname));
  }, []);

  return (
    <>
      {/* Overlay transition */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[var(--Background)] opacity-0 translate-y-full pointer-events-none z-[9999]"
        style={{
          borderRadius: "50% / 25%",
        }}
      >
        <div
          ref={textRef}
          className="text-[clamp(1.5rem,4vw,3rem)] font-semibold text-white opacity-0 tracking-[0.15em]"
        >
          {transitionText}
        </div>
      </div>

      <div className="page-content min-h-screen">{children}</div>
    </>
  );
}
