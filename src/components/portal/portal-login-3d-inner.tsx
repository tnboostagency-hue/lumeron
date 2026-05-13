"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const MORSE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
};

const UNIT_SEC = 0.11;

type MorseSeg = { kind: "dot" | "dash"; index: number };

function encodeMessage(phrase: string): { segments: MorseSeg[]; timeline: { segIndex: number; t0: number; t1: number }[]; totalDuration: number } {
  const upper = phrase.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
  const words = upper.split(/\s+/).filter(Boolean);
  const segments: MorseSeg[] = [];
  let t = 0;
  const timeline: { segIndex: number; t0: number; t1: number }[] = [];

  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi];
    for (let li = 0; li < word.length; li++) {
      const ch = word[li];
      const pattern = MORSE[ch];
      if (!pattern) continue;
      for (let si = 0; si < pattern.length; si++) {
        const sym = pattern[si] as "." | "-";
        const kind: "dot" | "dash" = sym === "." ? "dot" : "dash";
        const dur = sym === "." ? 1 : 3;
        const idx = segments.length;
        segments.push({ kind, index: idx });
        timeline.push({ segIndex: idx, t0: t, t1: t + dur * UNIT_SEC });
        t += dur * UNIT_SEC;
        if (si < pattern.length - 1) t += UNIT_SEC;
      }
      if (li < word.length - 1) t += 3 * UNIT_SEC;
    }
    if (wi < words.length - 1) t += 7 * UNIT_SEC;
  }

  const tail = 4 * UNIT_SEC;
  t += tail;
  return { segments, timeline, totalDuration: Math.max(t, 0.001) };
}

function segmentLayout(segments: MorseSeg[]) {
  const n = segments.length;
  const out: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
  const spread = 2.85;
  const arc = Math.PI * 0.92;
  for (let i = 0; i < n; i++) {
    const u = n <= 1 ? 0.5 : i / (n - 1);
    const a = -arc / 2 + u * arc;
    const x = Math.sin(a) * spread * 0.95;
    const z = Math.cos(a) * spread * 0.42 - 0.35;
    const y = Math.sin(i * 0.7) * 0.12;
    out.push({
      pos: [x, y, z],
      rot: [0.15 + Math.sin(i) * 0.08, a * 0.4, Math.cos(i * 0.5) * 0.12],
    });
  }
  return out;
}

function MorseTransmission({
  phrase,
  layout,
}: {
  phrase: string;
  layout: ReturnType<typeof segmentLayout>;
}) {
  const { segments, timeline, totalDuration } = useMemo(() => encodeMessage(phrase), [phrase]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const time = state.clock.elapsedTime % totalDuration;
    const active = new Set<number>();
    for (const ev of timeline) {
      if (time >= ev.t0 && time < ev.t1) active.add(ev.segIndex);
    }
    g.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      const on = active.has(i);
      const target = on ? 1.35 : 0.06;
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * 0.18;
    });
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {segments.map((seg, i) => {
        const L = layout[i];
        if (!L) return null;
        const isDot = seg.kind === "dot";
        return (
          <mesh key={seg.index} position={L.pos} rotation={L.rot}>
            {isDot ? (
              <sphereGeometry args={[0.11, 24, 24]} />
            ) : (
              <capsuleGeometry args={[0.07, 0.38, 6, 12]} />
            )}
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.45}
              roughness={0.35}
              emissive="#3ec8ba"
              emissiveIntensity={0.08}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Pull camera in + widen FOV on narrow viewports so the hero reads larger on phones. */
function ResponsiveCameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const { width, height } = useThree((s) => s.size);

  useLayoutEffect(() => {
    if (width < 480) {
      camera.position.set(0, 0.1, 4.05);
      camera.fov = 50;
    } else if (width < 640) {
      camera.position.set(0, 0.12, 4.35);
      camera.fov = 47;
    } else if (width < 1024) {
      camera.position.set(0, 0.13, 4.75);
      camera.fov = 44;
    } else {
      camera.position.set(0, 0.15, 5.2);
      camera.fov = 40;
    }
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  }, [width, height, camera]);

  return null;
}

function AmbientScene() {
  const phrase = "LUMERON ACCESS";
  const { segments } = useMemo(() => encodeMessage(phrase), []);
  const layout = useMemo(() => segmentLayout(segments), [segments]);
  const rootScale = useThree((s) => (s.size.width < 640 ? 1.14 : s.size.width < 1024 ? 1.06 : 1));

  return (
    <group scale={rootScale}>
      <ambientLight intensity={0.42} />
      <pointLight position={[6, 5, 6]} intensity={0.85} color="#3ec8ba" />
      <pointLight position={[-5, -3, 4]} intensity={0.4} color="#39968d" />
      <directionalLight position={[0, 8, 2]} intensity={0.55} color="#ffffff" />

      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.85}>
        <group position={[0, 0.55, 0]}>
          <MorseTransmission phrase={phrase} layout={layout} />
        </group>
      </Float>

      <Float speed={2.2} rotationIntensity={0.55} floatIntensity={0.9}>
        <mesh position={[0, -0.65, -0.8]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#f1f5f9"
            emissive="#39968d"
            emissiveIntensity={0.18}
            metalness={0.55}
            roughness={0.32}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.35} rotationIntensity={0.32} floatIntensity={0.55}>
        <mesh position={[2.15, -0.45, -0.35]} rotation={[0.35, 0.85, 0]}>
          <torusGeometry args={[0.68, 0.18, 20, 56]} />
          <meshStandardMaterial
            color="#2a4f4a"
            metalness={0.55}
            roughness={0.38}
            emissive="#229388"
            emissiveIntensity={0.12}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function PortalLogin3DInner() {
  return (
    <Canvas className="h-full min-h-[12rem] w-full touch-pan-y" gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0.15, 5.2]} fov={40} />
      <ResponsiveCameraRig />
      <AmbientScene />
    </Canvas>
  );
}
