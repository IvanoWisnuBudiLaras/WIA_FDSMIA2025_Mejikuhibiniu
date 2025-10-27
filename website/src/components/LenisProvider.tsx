"use client";

import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisProvider({ children }: { children: any }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
