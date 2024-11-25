import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Camera() {
  const camera = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/video-camera/model.gltf');
  return (
    <primitive 
      object={camera.scene} 
      scale={0.5} 
      position={[-2, 0, 0]} 
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

function Couple() {
  const couple = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/sitting-couple/model.gltf');
  return (
    <primitive 
      object={couple.scene} 
      scale={0.8} 
      position={[2, -1, 0]} 
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Camera />
          <Couple />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}