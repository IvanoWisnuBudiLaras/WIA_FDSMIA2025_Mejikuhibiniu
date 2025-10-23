"use client";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import {use, useEffect, useRef} from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {

    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const isTransitioning = useRef(false);
    const hasPlayedInitial = useRef(false);
    const previousPathname = useRef<string | null>(null);
    useEffect(() => {
        if (hasPlayedInitial.current && !isTransitioning.current) {
            return;
        }

        playEntryAnimation();
        hasPlayedInitial.current = true;
    }, [pathname]);

    const playEntryAnimation = () => {
        const isRouteChange = previousPathname.current !== null;

        const entryTL = gsap.timeline({
            onComplete: () => {
                isTransitioning.current = false;
                previousPathname.current = pathname;
            },
        });
        if (isRouteChange) {
            entryTL
            .set(overlayRef.current, {
                translateY: '100%',
                scale: 0.5,
                rotate: 30,

            })
            .to(overlayRef.current, {
                translateY: '0%',
                scale: 1,
                rotate: 0,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }
        entryTL.to(".page-content", {
           opacity: 1,
           duration: 0.5,
           ease: "power2.inOut",
        });
        entryTL.play();
    };
    useEffect(() => {
        const handleClick = (e: Event) => {
            e.preventDefault();
            const target = (e.target as HTMLAnchorElement).getAttribute("href");

            if(target) {
                const url = new URL(target, window.location.origin).pathname;
                if (url !== pathname && !isTransitioning.current) {
                    isTransitioning.current = true;
                    hasPlayedInitial.current = false;
                    exitPage(url);
                }
            }
        };
        const links= document.querySelectorAll("a[href^='/']");
        links.forEach((link) => {
            link.addEventListener("click", handleClick);
        });
        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
        };
    }, [pathname, router]);

    const exitPage = (url: string) => {
        const exitTL = gsap.timeline({
            onComplete: () => {
                router.push(url);
            },
        });
        exitTL.to(".page-content", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
        });
        exitTL.to(overlayRef.current, {
            translateY: '-200%',
            scale: 0.5,
            rotate: 30,
            duration: 0.8,
            ease: "power2.inOut",
        }, "-=0.3");
       exitTL.play();
    };
    return (
        <>
            <div ref={overlayRef} className="transition-overlay fixed top-0 left-0 -z-10 h-full w-full bg-[var(--Background)]"></div>
            {children}
        </>
    );
}
