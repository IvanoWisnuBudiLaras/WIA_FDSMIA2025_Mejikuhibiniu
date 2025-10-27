import React from "react";
import LostGallery3DClient from "./LostGallery3D.client";

// This file is a Server Component that renders the client-only component.
// Importing a client component from a server component is supported by Next's
// App Router — no `dynamic(..., { ssr: false })` is necessary here.
export default function LostGallery3D() {
  return <LostGallery3DClient />;
}
