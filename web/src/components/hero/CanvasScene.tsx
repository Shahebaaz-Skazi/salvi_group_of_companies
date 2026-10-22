"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import GearScene, { GearSceneProps } from "./GearScene";
import { 
  BG_COLOR, 
  DPR_MAX, 
  CAMERA_BASE_Z, 
  CAMERA_FOV, 
  CAMERA_NEAR, 
  CAMERA_FAR, 
  GEAR_RADIUS_ASSEMBLED, 
  GEAR_RADIUS_EXPLODED,
  STOPS_FRAMES,
  HOLD_F,
  SHIFT_X_RATIO
} from "@/constants/hero";

type CanvasSceneProps = GearSceneProps & { heroInView: boolean };

function CameraController({ targetProgressRef, override }: { targetProgressRef: React.MutableRefObject<number>, override: number | null }) {
  const { camera, size } = useThree();

  useFrame(() => {
    let raw = override !== null ? override : targetProgressRef?.current;
    if (!Number.isFinite(raw)) raw = 0;
    const progress = Number(raw);

    const isMobile = size.width < 768 || size.width < size.height;
    let targetZ = CAMERA_BASE_Z;

    if (isMobile) {
      const aspect = size.width / size.height;
      const vFov = (CAMERA_FOV * Math.PI) / 180;
      
      const explodeProg = STOPS_FRAMES.exploded / 990;
      const reassembleStart = (STOPS_FRAMES.firm6 + HOLD_F) / 990;
      
      let currentRadius = GEAR_RADIUS_ASSEMBLED;
      if (progress < explodeProg) {
        currentRadius = THREE.MathUtils.lerp(GEAR_RADIUS_ASSEMBLED, GEAR_RADIUS_EXPLODED, progress / explodeProg);
      } else if (progress < reassembleStart) {
        currentRadius = GEAR_RADIUS_EXPLODED;
      } else {
        currentRadius = THREE.MathUtils.lerp(GEAR_RADIUS_EXPLODED, GEAR_RADIUS_ASSEMBLED, (progress - reassembleStart) / (1 - reassembleStart));
      }

      const margin = 1.1;
      targetZ = (currentRadius * margin) / (Math.tan(vFov / 2) * aspect);
      targetZ = Math.max(targetZ, CAMERA_BASE_Z);
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);

    const isDesktop = size.width >= 1024;
    let targetX = 0;
    if (isDesktop) {
      const aspect = size.width / size.height;
      const vFov = (CAMERA_FOV * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * targetZ;
      const visibleWidth = visibleHeight * aspect;
      targetX = visibleWidth * SHIFT_X_RATIO;
    }
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, -targetX, 0.1);

    camera.updateProjectionMatrix();
  });

  return null;
}

export default function CanvasScene({ targetProgressRef, override, activeFirm, heroInView }: CanvasSceneProps) {
  // Let CameraController also use the ref and override to compute progress, or let it read displayed progress?
  // We can just give it the same ref and override, or compute it. Let's pass them.
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
      }}
      dpr={[1, DPR_MAX]}
      frameloop={heroInView ? "always" : "never"}
      camera={{ 
        position: [0, 0, CAMERA_BASE_Z], 
        fov: CAMERA_FOV,
        near: CAMERA_NEAR,
        far: CAMERA_FAR
      }}
    >
      <CameraController targetProgressRef={targetProgressRef} override={override} />
      
      {/* Diffuse lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[-5, 5, 5]} intensity={1.2} color="white" />
      <directionalLight position={[-4, 0, -5]} intensity={1.5} color="#3b82f6" />
      <directionalLight position={[4, 0, -5]} intensity={1.5} color="#3b82f6" />

      {/* Reflections: Lightformers inside Environment */}
      <Environment resolution={256}>
        <Lightformer intensity={1.5} color="white" position={[-5, 5, 3]} scale={[10, 2, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={4} color="#3b82f6" position={[-4, 0, -5]} scale={[2, 10, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={4} color="#3b82f6" position={[4, 0, -5]} scale={[2, 10, 1]} target={[0, 0, 0]} />
        <Lightformer intensity={1} color="#00D9B8" position={[0, -2, 6]} scale={[4, 2, 1]} target={[0, 0, 0]} />
      </Environment>

      <GearScene targetProgressRef={targetProgressRef} override={override} activeFirm={activeFirm} />
    </Canvas>
  );
}
