"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import StarField from "./StarField";
import GlowPlane from "./GlowPlane";
import {
  ANIM_DURATION_S,
  MIXER_LERP,
  PARALLAX_DEG,
  FIRM_ACCENTS,
  EMISSIVE_IDLE,
  EMISSIVE_LOW,
  EMISSIVE_HIGH,
  STOPS_FRAMES,
  HOLD_F,
  TOTAL_FRAMES,
  IDLE_SPIN_SPEED,
  GEAR_MODEL_URL,
  IDLE_FADE_START,
  IDLE_FADE_END,
} from "@/constants/hero";

export interface GearSceneProps {
  targetProgressRef: React.MutableRefObject<number>;
  override: number | null;
  activeFirm: 0 | 1 | 2 | 3 | 4 | 5 | null;
}

useGLTF.setDecoderPath("/draco/");
useGLTF.preload(GEAR_MODEL_URL);

const ACCENT_MESH_NAMES = [
  "quarter_1_accent",
  "quarter_2_accent",
  "quarter_3_accent",
  "quarter_4_accent",
  "quarter_5_accent",
  "quarter_6_accent",
];

const FIRM_HOLD_STARTS = [
  STOPS_FRAMES.firm1 / TOTAL_FRAMES,
  STOPS_FRAMES.firm2 / TOTAL_FRAMES,
  STOPS_FRAMES.firm3 / TOTAL_FRAMES,
  STOPS_FRAMES.firm4 / TOTAL_FRAMES,
  STOPS_FRAMES.firm5 / TOTAL_FRAMES,
  STOPS_FRAMES.firm6 / TOTAL_FRAMES,
];
const HOLD_SIZE = HOLD_F / TOTAL_FRAMES;

function GearModel({ targetProgressRef, override, activeFirm }: GearSceneProps) {
  const gltf = useGLTF(GEAR_MODEL_URL) as any;
  const { scene, animations } = gltf;

  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const currentTime = useRef(0);
  const displayedProgress = useRef(0);
  const mouseXY = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<THREE.Group>(null);
  const accentMeshes = useRef<(THREE.Mesh | null)[]>([null, null, null, null, null, null]);
  const emissiveLevels = useRef([0, 0, 0, 0, 0, 0]);
  const isSetup = useRef(false);
  const idleAccumulator = useRef(0);
  const lastAppliedAngle = useRef(0);

  // Setup mixer + collect accent meshes (idempotent)
  useEffect(() => {
    if (isSetup.current) return;
    isSetup.current = true;

    // Apply material fixes for lighting, and reset any NaNs from HMR poisoning
    scene.traverse((o: any) => {
      if (o.isMesh && o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((mat: any) => {
          if (mat.name && mat.name.includes("steel_dark")) {
            mat.color = new THREE.Color("#2a2d33");
            mat.roughness = 0.3;
          }
          mat.envMapIntensity = 1.2;
          mat.needsUpdate = true;
        });
      }
      
      // NaN cleanse
      if (o.position && (!Number.isFinite(o.position.x) || !Number.isFinite(o.position.y) || !Number.isFinite(o.position.z))) {
        o.position.set(0, 0, 0);
      }
      if (o.quaternion && (!Number.isFinite(o.quaternion.x) || !Number.isFinite(o.quaternion.y) || !Number.isFinite(o.quaternion.z) || !Number.isFinite(o.quaternion.w))) {
        o.quaternion.identity();
      }
      if (o.scale && (!Number.isFinite(o.scale.x) || !Number.isFinite(o.scale.y) || !Number.isFinite(o.scale.z))) {
        o.scale.set(1, 1, 1);
      }
    });

    const m = new THREE.AnimationMixer(scene);
    animations.forEach((clip: THREE.AnimationClip) => {
      const action = m.clipAction(clip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.paused = false;
      action.enabled = true;
      action.play();
    });
    mixer.current = m;

    ACCENT_MESH_NAMES.forEach((name, i) => {
      const obj = scene.getObjectByName(name);
      if (!obj) return;
      const mesh = obj as THREE.Mesh;
      accentMeshes.current[i] = mesh;
      const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
      if (mat) {
        if (!mat.emissive || (mat.emissive.r === 0 && mat.emissive.g === 0 && mat.emissive.b === 0)) {
          mat.emissive = new THREE.Color(FIRM_ACCENTS[i]);
        }
        mat.emissiveIntensity = EMISSIVE_IDLE;
      }
    });

    const carrier = scene.getObjectByName("carrier_plate");
    if (carrier) carrier.visible = false;

    return () => {
      m.stopAllAction();
      m.uncacheRoot(scene);
      mixer.current = null;
      isSetup.current = false;
    };
  }, [scene, animations]);

  // Mouse parallax
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseXY.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseXY.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Dispose geometry/materials on unmount
  useEffect(() => {
    return () => {
      scene.traverse((obj: THREE.Object3D) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m: THREE.Material) => m.dispose());
        } else {
          (mesh.material as THREE.Material | undefined)?.dispose();
        }
      });
    };
  }, [scene]);

  // Per-frame update — no object allocation
  useFrame(({ clock }, delta) => {
    if (!mixer.current) return;

    // 4. Smooth targetProgress with absolute NaN safety
    const dt = Math.min(delta || 0, 0.05);
    
    let rawTarget = override !== null ? override : targetProgressRef?.current;
    let target = Number(rawTarget);
    if (!Number.isFinite(target)) target = 0;

    let displayed = displayedProgress.current;
    if (!Number.isFinite(displayed)) displayed = 0;
    
    displayed += (target - displayed) * (1 - Math.exp(-dt * 8));
    if (!Number.isFinite(displayed)) displayed = 0;
    
    displayedProgress.current = displayed;
    const progress = displayed;

    const targetTime = progress * ANIM_DURATION_S;
    currentTime.current = THREE.MathUtils.lerp(currentTime.current, targetTime, MIXER_LERP);
    let t = THREE.MathUtils.clamp(currentTime.current, 0, ANIM_DURATION_S - 0.001);
    if (!Number.isFinite(t)) t = 0;

    // Idle spin: accumulate angle properly and avoid mixer compounding
    const spinNode = scene.getObjectByName("GEAR_SPIN");
    if (spinNode) {
      if (lastAppliedAngle.current) {
        spinNode.rotateY(-lastAppliedAngle.current);
      }
    }

    // Apply time to all actions
    animations.forEach((clip: THREE.AnimationClip) => {
      const action = mixer.current!.clipAction(clip);
      action.time = t;
    });
    mixer.current.update(0);

    if (spinNode) {
      let fade = 1 - THREE.MathUtils.smoothstep(progress, IDLE_FADE_START, IDLE_FADE_END);
      idleAccumulator.current += dt * IDLE_SPIN_SPEED * fade;
      if (Number.isFinite(idleAccumulator.current)) {
        spinNode.rotateY(idleAccumulator.current);
        lastAppliedAngle.current = idleAccumulator.current;
      }
    }

    const timePulse = clock.elapsedTime * 2;
    for (let i = 0; i < 6; i++) {
      const mesh = accentMeshes.current[i];
      if (!mesh) continue;
      const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
      if (!mat) continue;

      const inHold =
        progress >= FIRM_HOLD_STARTS[i] - 0.005 &&
        progress <= FIRM_HOLD_STARTS[i] + HOLD_SIZE + 0.005;
      const isActive = activeFirm === i && inHold;
      const pulse = EMISSIVE_LOW + Math.sin(timePulse + i) * ((EMISSIVE_HIGH - EMISSIVE_LOW) / 2);
      const targetEI = isActive ? pulse : EMISSIVE_IDLE;

      emissiveLevels.current[i] = THREE.MathUtils.lerp(emissiveLevels.current[i], targetEI, 0.06);
      mat.emissiveIntensity = emissiveLevels.current[i];
    }

    if (wrapperRef.current) {
      const maxRad = (PARALLAX_DEG * Math.PI) / 180;
      wrapperRef.current.rotation.y = THREE.MathUtils.lerp(
        wrapperRef.current.rotation.y,
        mouseXY.current.x * maxRad,
        0.04
      );
      wrapperRef.current.rotation.x = THREE.MathUtils.lerp(
        wrapperRef.current.rotation.x,
        -mouseXY.current.y * maxRad * 0.5,
        0.04
      );
    }
  });

  const activeFirmColor = activeFirm !== null ? FIRM_ACCENTS[activeFirm] : FIRM_ACCENTS[0];

  return (
    <>
      <StarField />
      <GlowPlane activeFirmColor={activeFirmColor} blend={activeFirm !== null ? 1 : 0} />
      <group ref={wrapperRef}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={scene} />
        </group>
      </group>
    </>
  );
}

export default function GearScene({ targetProgressRef, override, activeFirm }: GearSceneProps) {
  return <GearModel targetProgressRef={targetProgressRef} override={override} activeFirm={activeFirm} />;
}
