"use client";

import { motion } from "framer-motion";
import HorizontalScrollShowcase from "@/components/HorizontalScroll";

export default function Page() {
  return (
    <main style={{ overflowX: "hidden"}}>
      {/* 👋 Welcome Section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
          color: "white",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            fontSize: "clamp(48px, 8vw, 120px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Welcome to <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{
              background: "linear-gradient(90deg, #00d4ff, #8a2be2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MyKisah
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            maxWidth: 600,
            marginTop: 24,
            color: "#999",
            fontSize: "clamp(16px, 2vw, 20px)",
          }}
        >
          Website ini dirancang untuk memajukan bisnis UMKM yang ada di Tulungagung.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{
            marginTop: 50,
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#888",
          }}
        >
          Scroll to explore ↓
        </motion.div>
      </section>

      {/* 🌀 Horizontal Showcase Section */}
      <HorizontalScrollShowcase />

      {/* 🧩 Section After Showcase */}
      <motion.section
        style={{
          height: "120vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={{ maxWidth: 680, textAlign: "center", padding: "3rem" }}>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>More content below</h2>
          <p style={{ color: "#888" }}>
            This area appears after the horizontal showcase. You can use this section to tell more about your
            work or contact info.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
