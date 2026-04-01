import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 3000, theme = 'dark' }) => {
  const points = useRef();
  const group = useRef();

  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;

      points.current.rotation.x += ((mouseY * 0.22) - points.current.rotation.x) * 0.05;
      points.current.rotation.y += ((mouseX * 0.28) - points.current.rotation.y) * 0.05;
      points.current.rotation.z += (delta * 0.04);
    }

    if (group.current) {
      const targetX = state.mouse.x * 0.9;
      const targetY = state.mouse.y * 0.6;

      group.current.position.x += (targetX - group.current.position.x) * 0.06;
      group.current.position.y += (targetY - group.current.position.y) * 0.06;
    }
  });

  const particleColor = theme === 'dark' ? '#aa3bff' : '#7c3aed';

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const CanvasBackground = ({ theme }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]} // Support high-DPI displays
      gl={{ antialias: true, alpha: true }}
    >
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.5} />
      <ParticleField count={4000} theme={theme} />
    </Canvas>
  );
};

export default CanvasBackground;
