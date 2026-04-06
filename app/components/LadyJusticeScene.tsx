"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Animation config — single source of truth for scroll keyframes    */
/* ------------------------------------------------------------------ */
const START_ROT = Math.PI * 0.225; // 45° to the right

const SCROLL_KEYFRAMES = {
  hero:     { rotY: START_ROT,                    scaleF: 1,    rotX: 0,    posY: 0     },
  about:    { rotY: START_ROT + Math.PI * 0.5,    scaleF: 0.8,  rotX: 0,    posY: -0.2  },
  practice: { rotY: START_ROT + Math.PI,          scaleF: 0.6,  rotX: 0.15, posY: -0.4  },
  contact:  { rotY: START_ROT + Math.PI * 1.5,    scaleF: 0.4,  rotX: 0,    posY: -0.6  },
  end:      { rotY: START_ROT + Math.PI * 2,      scaleF: 0.3,  rotX: 0,    posY: -0.8  },
} as const;

/* Helper: lerp between two keyframes */
function lerpKeyframe(
  a: (typeof SCROLL_KEYFRAMES)[keyof typeof SCROLL_KEYFRAMES],
  b: (typeof SCROLL_KEYFRAMES)[keyof typeof SCROLL_KEYFRAMES],
  t: number,
) {
  return {
    rotY: THREE.MathUtils.lerp(a.rotY, b.rotY, t),
    rotX: THREE.MathUtils.lerp(a.rotX, b.rotX, t),
    scaleF: THREE.MathUtils.lerp(a.scaleF, b.scaleF, t),
    posY: THREE.MathUtils.lerp(a.posY, b.posY, t),
  };
}

/* ------------------------------------------------------------------ */
/*  3D Model                                                          */
/* ------------------------------------------------------------------ */
function LadyJusticeModel({ isDesktop }: { isDesktop: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/LadyJustice.glb");
  const { viewport } = useThree();

  // Scroll-driven target values (written by ScrollTrigger, read by useFrame)
  const target = useRef({ rotY: START_ROT, rotX: 0, scaleF: 1, posY: 0 });

  /* --- Enhance materials for a clean monochrome look --- */
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.metalness = 0.7;
          mat.roughness = 0.25;
          mat.envMapIntensity = 1.8;
        }
      }
    });
  }, [scene]);

  /* --- Single ScrollTrigger across entire page for smooth continuous rotation --- */
  useEffect(() => {
    const K = SCROLL_KEYFRAMES;
    const segments = [
      { a: K.hero, b: K.about },
      { a: K.about, b: K.practice },
      { a: K.practice, b: K.contact },
      { a: K.contact, b: K.end },
    ];
    const numSegments = segments.length;

    const trigger = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress * numSegments;
        const idx = Math.min(Math.floor(p), numSegments - 1);
        const t = p - idx;
        Object.assign(target.current, lerpKeyframe(segments[idx].a, segments[idx].b, t));
      },
    });

    return () => trigger.kill();
  }, []);

  /* --- Per-frame interpolation for smoothness --- */
  useFrame(() => {
    if (!groupRef.current) return;

    const lerpFactor = 0.08;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target.current.rotY,
      lerpFactor,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.rotX,
      lerpFactor,
    );

    // Scale relative to viewport so the model fills the canvas half
    const baseScale = Math.min(viewport.width, viewport.height) * 0.35;
    const finalScale = baseScale * target.current.scaleF;

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, finalScale, lerpFactor),
    );

    // Move model down as it shrinks
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      target.current.posY,
      lerpFactor,
    );
  });

  return (
    <group ref={groupRef} position={[0.07, 0, 1]}>
      <primitive object={scene} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas wrapper                                                    */
/* ------------------------------------------------------------------ */
export default function LadyJusticeScene() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed z-10 pointer-events-none ${
        isDesktop
          ? "top-0 left-0 w-full h-screen"
          : "bottom-0 right-0 w-[50vw] h-[40vh]"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        dpr={isDesktop ? [1, 2] : [1, 1.5]}
      >
        {/* Key light — strong from upper-right */}
        <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" />
        {/* Fill light — softer from opposite side */}
        <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#d0d0d0" />
        {/* Rim light — subtle backlight for edge definition */}
        <spotLight position={[0, 6, -6]} angle={0.4} penumbra={1} intensity={0.8} color="#ffffff" />
        {/* Ambient fill */}
        <ambientLight intensity={0.3} />

        <Suspense fallback={null}>
          <LadyJusticeModel isDesktop={isDesktop} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.3}
            scale={10}
            blur={2.5}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the GLB (Drei handles Draco decoding automatically)
useGLTF.preload("/LadyJustice.glb");
