'use client';

import React, { FC as FunctionComponent, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/Addons.js';

const ThreeScene: FunctionComponent = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Set up the canvas and renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up the camera and renderer
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up clock for delta time
    const clock = new THREE.Clock();

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // White Material
    const whiteMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    // White Material
    const whiteMaterialWireframe = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      wireframe: true,
    });

    // Load mesh and add to scene
    const loader = new OBJLoader();
    loader.load('/logo.obj', logo => {
      logo.traverse(child => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.material = whiteMaterial;
        }
      });
      logo.position.set(0, 0, 0);
      logo.scale.set(0.1, 0.1, 0.1);
      scene.add(logo);

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const scale = 0.2;
      const randomDeltaRotation = {
        x: lerp(scale, -scale, Math.random()),
        y: lerp(scale, -scale, Math.random()),
        z: lerp(scale, -scale, Math.random()),
      };

      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        logo.rotation.x += randomDeltaRotation.x * delta;
        logo.rotation.y += randomDeltaRotation.y * delta;
        logo.rotation.z += randomDeltaRotation.z * delta;
        renderer.render(scene, camera);
      }

      animate();

      function animateTick() {
        setTimeout(() => {
          requestAnimationFrame(animateTick);
        }, 150 * Math.random());
        logo.traverse(child => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.material =
              Math.random() > 0.1 ? whiteMaterial : whiteMaterialWireframe;
          }
        });
      }

      animateTick();
    });

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Call handleResize to set initial size
    handleResize();

    return () => {
      // Clean up the event listener and renderer on component unmount
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className='w-full h-full' />
    </>
  );
};

const Page: FunctionComponent = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <ThreeScene />
    </div>
  );
};

export default Page;
