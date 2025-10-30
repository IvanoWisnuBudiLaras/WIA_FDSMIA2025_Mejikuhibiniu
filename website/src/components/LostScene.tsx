"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function FloatingPlane() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t / 3) * 0.05;
    ref.current.rotation.y = Math.cos(t / 4) * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <planeGeometry args={[12, 8, 32, 32]} />
      <meshStandardMaterial color="#f2eee5" />
    </mesh>
  );
}

export default function LostScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 2]} intensity={1.2} />
        <FloatingPlane />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
