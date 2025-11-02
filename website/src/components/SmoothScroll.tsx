"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { MdAddBusiness } from "react-icons/md";

export default function SmoothScroll() {
  return (
    <div className="bg-zinc-950 text-white">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          smoothWheel: true,
          syncTouch: true,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
}

// ======================= NAVBAR =======================

const Nav = () => {
  const scrollToSchedule = () => {
    const el = document.getElementById("launch-schedule");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white mix-blend-difference">
      <MdAddBusiness className="text-3xl" />
      <button
        onClick={scrollToSchedule}
        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        TULUNGUSAHA <FiArrowRight />
      </button>
    </nav>
  );
};

// ======================= HERO SECTION =======================

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url('/bg.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    />
  );
};

// ======================= PARALLAX IMAGES =======================

const ParallaxImages = () => {
  return (
    <div className="relative mx-auto max-w-6xl px-4 pt-[45vh] pb-32 flex flex-col gap-44 overflow-hidden">
      {/* Row 1 — 3 images */}
      <div className="flex justify-center gap-6 relative z-10">
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392414/Clarissa_olmssj.jpg"
          alt="Clarisa Store"
          start={-150}
          end={250}
          className="w-1/3 h-[260px]"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392411/aioLaundry_et4jvy.png"
          alt="Aio Laundry"
          start={-200}
          end={300}
          className="w-1/3 h-[280px] mt-8"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392414/BimaGym_yvn3eu.jpg"
          alt="Bima Gym"
          start={-180}
          end={280}
          className="w-1/3 h-[240px]"
        />
      </div>

      {/* Row 2 — 3 images */}
      <div className="flex justify-center gap-6 relative z-20 mt-24">
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392420/RamenMaster_nl9v1u.jpg"
          alt="Ramen Master"
          start={-200}
          end={320}
          className="w-1/3 h-[240px]"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392416/JayaSaktiMotor_ocfivt.jpg"
          alt="Jaya Sakti Motor"
          start={-250}
          end={350}
          className="w-1/3 h-[260px] mt-6"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392417/BuanaTravel_xxfmsh.jpg"
          alt="Buana Travel"
          start={-200}
          end={300}
          className="w-1/3 h-[220px]"
        />
      </div>

      {/* Row 3 — 4 images */}
      <div className="flex justify-center gap-4 relative z-30 mt-40">
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392418/MadjuMapan_xzmcsn.png"
          alt="Madju Mapan"
          start={400}
          end={-400}
          className="w-1/4 h-[250px]"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392411/Bago_Furniture_npmpjz.jpg"
          alt="Bago Furniture"
          start={420}
          end={-420}
          className="w-1/4 h-[240px] mt-8"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392410/Bakso_Kuy_ybzduw.jpg"
          alt="Bakso Kuy"
          start={440}
          end={-440}
          className="w-1/4 h-[260px]"
        />
        <ParallaxImg
          src="https://res.cloudinary.com/dmyjffkoa/image/upload/v1761392414/BilionsCoffie_zebfr4.jpg"
          alt="Billions Coffee"
          start={460}
          end={-460}
          className="w-1/4 h-[250px] mt-6"
        />
      </div>

      {/* Fade bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent to-zinc-950 z-40 pointer-events-none" />
    </div>
  );
};

// ======================= PARALLAX IMAGE COMPONENT =======================

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
    offset: ["start end", "end start"],
  });

  // cepat naik
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={`${className} rounded-2xl object-cover shadow-lg`}
      style={{ transform, opacity }}
    />
  );
};

// ======================= SCHEDULE SECTION =======================

const Schedule = () => {
  const items = [
    { title: "Clarisa Store", date: "Fashion", location: "Tulungagung" },
    { title: "Aio Laundry", date: "Jasa", location: "Tulungagung" },
    { title: "Bima Gym", date: "Jasa", location: "Tulungagung" },
    { title: "Billions Coffee", date: "Kuliner", location: "Tulungagung" },
    { title: "Ramen Master", date: "Kuliner", location: "Tulungagung" },
    { title: "Jaya Sakti Motor", date: "Jasa", location: "Tulungagung" },
    { title: "Buana Travel", date: "Jasa", location: "Tulungagung" },
    { title: "Madju Mapan", date: "Kuliner", location: "Tulungagung" },
    { title: "Bago Furniture", date: "Jasa", location: "Tulungagung" },
    { title: "BaksoKuy", date: "Kuliner", location: "Tulungagung" },
  ];

  return (
    <section id="launch-schedule" className="mx-auto max-w-5xl px-4 pt-40 pb-48 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-center"
      >
        MOST POPULAR
      </motion.h1>

      {items.map((item, i) => (
        <ScheduleItem key={i} {...item} />
      ))}
    </section>
  );
};

const ScheduleItem = ({
  title,
  date,
  location,
}: {
  title: string;
  date: string;
  location: string;
}) => (
  <motion.div
    initial={{ y: 48, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeInOut", duration: 0.75 }}
    className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
  >
    <div>
      <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
      <p className="text-sm uppercase text-zinc-500">{date}</p>
    </div>
    <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
      <p>{location}</p>
      <FiMapPin />
    </div>
  </motion.div>
);
