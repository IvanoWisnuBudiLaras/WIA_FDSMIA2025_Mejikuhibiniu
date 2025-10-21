"use client";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";


interface ImageProps {
  className?: string;
  img: string;
  alt: string;
  start: number;
  end: number;
}

ImageProps Propeti = {
  [className:]
};

export default function SmoothScroll() {
  return (
    <div className="bg-pink-200">
      <Hero />
      <div className="h-screen" />
    </div>
  );
};
const SECTION_HEIGHT = 1500;
const Hero = () => {
  return (
    <div className="relative w-full" style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}>
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 
                      bg-gradient-to-b from-zinc-50/0 to-zinc-50"/>
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const opacity =  useTransform (scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500],[1, 0]);
  const backgroundSize =  useTransform (scrollY, [0, SECTION_HEIGHT + 500],["170%", "100%"]);
  return (
    <motion.div className="sticky top-0 h-screen w-full"
    style={{ 
      opacity,
      backgroundSize,
      clipPath,
      backgroundImage: "url(https://images.ctfassets.net/hrltx12pl8hq/7xxnksPxvjwV1zgMwpGPMr/a51dc50e08f05584a7f6edc9671e44f3/soft-pink-vs-dusty-rose.jpg)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto w-2/3">
      <ParallaxImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlSVNtYj2jYB7ApuRekg5l-dC2UWrQzydLQ&s"
      alt="Oreo Biskuit"
      start={-400}
      end={200}
      className="ml-20 w-2/5" />
      <ParallaxImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKN8l6P9kCog2aJaAaki2wjjDDCFEqrsLgrg&s"
      alt="Oreo Biskuit"
      start={200}
      end={-200}
      className="ml-10 w-1/3" />
      <ParallaxImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROYK4wBlmTTYCNihif1dlJsKI7MZmhIMk2wQ&s"
      alt="Oreo Biskuit"
      start={300}
      end={-150}
      className="ml-auto w-5/12" />
      <ParallaxImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz8qYVVFKg25NK-p9ZFCx3IlGR9so6Qo6Q-w&s"
      alt="Oreo Biskuit"
      start={300}
      end={-150}
      className="ml-auto w-5/12" />
      <ParallaxImg
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRyGJdp2UvEIPb8bw_mVhHIoeN-Yp5KJwNfA&s"
      alt="Oreo Biskuit"
      start={100}
      end={-500}
      className="ml-50 w-5/12" />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

 const opacity = useTransform(scrollYProgress, [0.75, 1],
  [1,0]);
  const y = useTransform(scrollYProgress, [0, 1],
  [start, end]);
 const scale = useTransform(scrollYProgress, [0.75, 1],
  [1,0.85]);

 const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return <motion.img
  style={{ opacity, transform}}  
  ref={ref}
  alt={alt} 
  src={src}
  className={className} />;
};

const Schecule = () => {
  return (
    <section id="launch-schedule"
    className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1 
        initial={{ y:48, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{ease: "easeInOut", duration: 0.75}}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      />
    </section>
  )
}