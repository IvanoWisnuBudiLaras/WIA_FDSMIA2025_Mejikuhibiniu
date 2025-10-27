"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

type Props = {
  data: Array<any>;
};

function RowPlanes({
  textures,
  offset = 0,
  speed = 0.2,
  control,
  y = 0,
  z = 0,
}: {
  textures: THREE.Texture[];
  offset?: number;
  speed?: number;
  control?: { scroll: React.RefObject<number>; velocity: React.RefObject<number> };
  y?: number;
  z?: number;
}) {
  const group = useRef<THREE.Group | null>(null);

  useFrame((state: any, delta: number) => {
  if (!group.current) return;
  // ensure row position (y,z) is maintained
  group.current.position.y = y;
  group.current.position.z = z;
    // respond to user drag/wheel velocity only (no automatic motion)
    const vel = control?.velocity?.current ?? 0;
    const sc = control?.scroll?.current ?? 0;

    // small deadzone so tiny residual values don't cause unintended drift
    const deadzoneVel = Math.abs(vel) > 0.25 ? vel : 0;
    const deadzoneScroll = Math.abs(sc) > 0.5 ? sc : 0;
    // movement derived only from user input (velocity from drag/wheel or page scroll)
    const movement = (deadzoneVel * 0.12 + deadzoneScroll * 0.002) * speed;
    if (movement !== 0) {
      group.current.position.x += movement;
    }

    // damping on shared velocity and scroll so motion decays when user releases
    if (control?.velocity) control.velocity.current *= 0.88;
    if (control?.scroll) control.scroll.current *= 0.85;

    // loop roughly based on textures length and spacing
    const spacing = 2.6; // same multiplier as mesh placement
    const limit = textures.length * spacing * 0.6;
    if (group.current.position.x < -limit) group.current.position.x += limit;
    if (group.current.position.x > limit) group.current.position.x -= limit;
  });

  return (
    <group ref={group}>
      {textures.map((tx, i) => (
        <mesh
          key={i}
          // increase spacing so rows don't overlap and create a cinematic feel
          position={[i * 2.6 + offset, 0, 0]}
          onClick={(e: any) => {
            e.stopPropagation();
            const p = e.point;
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("gallery:zoom", { detail: { index: i, position: [p.x, p.y, p.z] } }));
            }
          }}
        >
          <planeGeometry args={[1.8, 1.1]} />
          <meshStandardMaterial map={tx} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function LostGallery3D_r3f({ data }: Props) {
  const urls = data.slice(0, 9).map((d: any) => d.Gambar);
  const textures = useLoader(THREE.TextureLoader, urls);

  const cameraRef = useRef<any>(null);

  // Drag / scroll controls (DOM overlay captures pointer events)
  const isDown = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0);
  const scroll = useRef(0);

  // Pointer handlers (attached to a transparent overlay div)
  const onPointerDown = (e: React.PointerEvent) => {
    isDown.current = true;
    prevX.current = e.clientX;
    try {
      // capture pointer so we receive move/up even if leaving the element
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    const dx = e.clientX - prevX.current;
    prevX.current = e.clientX;
    // accumulate scroll and velocity
    scroll.current += dx;
    velocity.current = dx;
  };

  const onPointerUp = (e?: React.PointerEvent) => {
    isDown.current = false;
    try {
      if (e) (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const onWheel = (e: React.WheelEvent) => {
    scroll.current += -e.deltaY * 0.5;
    velocity.current = -e.deltaY * 0.3;
  };

  // CameraController: runs inside the Canvas so hooks are valid
  function CameraController() {
    const { mouse, camera } = useThree();
    useFrame(() => {
      const cam = cameraRef.current ?? camera;
      if (!cam) return;
      // lerp rotations based on mouse
      cam.rotation.y = THREE.MathUtils.lerp(cam.rotation.y, mouse.x * 0.5, 0.05);
      cam.rotation.x = THREE.MathUtils.lerp(cam.rotation.x, -mouse.y * 0.3, 0.05);
    });
    return null;
  }

  // Attach a window scroll listener so vertical page scroll (down) triggers gallery movement
  useEffect(() => {
    const prev = { y: typeof window !== "undefined" ? window.scrollY : 0 };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - prev.y;
      prev.y = y;
      // only consider downward scroll to trigger gallery movement
      if (dy > 0) {
        scroll.current += dy * 2; // amplify a bit to make effect noticeable
        velocity.current = dy * 0.8;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onZoom = (e: Event) => {
      const ev = e as CustomEvent<any>;
      const detail = ev.detail || {};
      const pos = detail.position || [0, 0, 0];
      const cam = cameraRef.current;
      if (!cam) return;
      // cinematic zoom toward clicked point
      gsap.killTweensOf(cam.position);
      gsap.to(cam.position, { x: pos[0] * 0.7, y: pos[1] * 0.7, z: 4.0, duration: 1.2, ease: "power3.inOut" });
      // slight tilt
      gsap.to(cam.rotation, { x: -0.12, y: (pos[0] * 0.12) || 0, duration: 1.2, ease: "power3.inOut" });
    };

    const onReset = () => {
      const cam = cameraRef.current;
      if (!cam) return;
      gsap.killTweensOf(cam.position);
      gsap.to(cam.position, { x: 0, y: 0, z: 10, duration: 1.2, ease: "power3.inOut" });
      gsap.to(cam.rotation, { x: 0, y: 0, duration: 1.2, ease: "power3.inOut" });
    };

    window.addEventListener("gallery:zoom", onZoom as EventListener);
    window.addEventListener("gallery:reset", onReset as EventListener);

    return () => {
      window.removeEventListener("gallery:zoom", onZoom as EventListener);
      window.removeEventListener("gallery:reset", onReset as EventListener);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        // attach pointer and wheel handlers to the Canvas element so clicks on meshes still work
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <PerspectiveCamera makeDefault ref={cameraRef} fov={85} position={[0, 0, 10]} />
        <ambientLight intensity={0.9} />
        <directionalLight intensity={0.6} position={[2, 4, 5]} />
  <RowPlanes textures={textures} speed={0.25} control={{ scroll, velocity }} y={1.8} z={-1.2} offset={-6} />
  <RowPlanes textures={textures} offset={0} speed={0.18} control={{ scroll, velocity }} y={0} z={0} />
  <RowPlanes textures={textures} offset={6} speed={0.32} control={{ scroll, velocity }} y={-1.8} z={1.2} />
        <CameraController />
      </Canvas>
      {/* Note: overlay removed in favor of Canvas handlers so mesh clicks remain interactive */}
    </div>
  );
}
