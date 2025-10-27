"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isTransitioning = useRef(false);
  const hasPlayedInitial = useRef(false);
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!hasPlayedInitial.current) {
      playEntryAnimation();
      hasPlayedInitial.current = true;
    }
  }, []);

  const playEntryAnimation = () => {
    const entryTL = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    entryTL
      .set(overlayRef.current, {
        translateY: "100%",
        scale: 0.5,
        rotate: 30,
      })
      .to(overlayRef.current, {
        translateY: "0%",
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(".page-content", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='/']") as HTMLAnchorElement | null;
      if (!link) return;

      e.preventDefault();
      const url = new URL(link.href).pathname;

      if (!isTransitioning.current && url !== window.location.pathname) {
        isTransitioning.current = true;
        exitPage(url);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const exitPage = (url: string) => {
    const exitTL = gsap.timeline({
      onComplete: () => {
        window.location.assign(url);
      },
    });

    exitTL
      .to(".page-content", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        overlayRef.current,
        {
          translateY: "-200%",
          scale: 0.5,
          rotate: 30,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="transition-overlay fixed top-0 left-0 z-[9999] h-full w-full bg-[var(--Background)] pointer-events-none"
      />
      {children}
    </>
  );
}
