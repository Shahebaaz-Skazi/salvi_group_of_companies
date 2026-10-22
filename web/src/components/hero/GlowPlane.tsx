"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NEUTRAL_GLOW, FIRM_ACCENTS, GLOW_ACCENTS } from "@/constants/hero";

interface GlowPlaneProps {
  activeFirmColor: string;
  blend: number; // 0-1: 0 = neutral, 1 = firm colour
}

export default function GlowPlane({ activeFirmColor, blend }: GlowPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetColor = useRef(new THREE.Color(NEUTRAL_GLOW));
  const currentColor = useRef(new THREE.Color(NEUTRAL_GLOW));

  const geo = useMemo(() => new THREE.PlaneGeometry(50, 50), []);
  const mat = useMemo(() => {
    if (typeof document === "undefined") {
      return new THREE.MeshBasicMaterial({
        color: new THREE.Color(NEUTRAL_GLOW),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    }
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.18)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(NEUTRAL_GLOW),
      map: tex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const m = meshRef.current.material as THREE.MeshBasicMaterial;
        let targetHex = NEUTRAL_GLOW;
    if (blend > 0.01) {
      const idx = Object.values(FIRM_ACCENTS).indexOf(activeFirmColor);
      if (idx !== -1) targetHex = GLOW_ACCENTS[idx];
    }
    targetColor.current.set(targetHex);
    currentColor.current.lerp(targetColor.current, 0.05);
    m.color.copy(currentColor.current);
  });

  return (
    <mesh ref={meshRef} geometry={geo} material={mat} position={[0, 0, -6]}>
    </mesh>
  );
}
