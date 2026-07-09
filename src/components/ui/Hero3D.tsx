"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere mathematically
  const [sphere] = useState(() => {
    const points = new Float32Array(3600); // 1200 particles
    for (let i = 0; i < points.length; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.5; // radius 1.5
      
      points[i] = r * Math.sin(phi) * Math.cos(theta);
      points[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i + 2] = r * Math.cos(phi);
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow constant rotation
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.04;
      
      // Gentle follow mouse
      const targetX = (mouseX / window.innerWidth) * 0.4;
      const targetY = (mouseY / window.innerHeight) * 0.4;
      
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({
      x: e.clientX - window.innerWidth / 2,
      y: e.clientY - window.innerHeight / 2,
    });
  };

  return (
    <div 
      className="absolute inset-0 z-0 h-full w-full bg-transparent"
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 1.2] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0070f3" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <ParticleSphere mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  );
}
