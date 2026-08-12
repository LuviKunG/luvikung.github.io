import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { isDebugging } from '@/env';

import type { TestInstance } from './types';

const createInstance = (options?: unknown): TestInstance => {
  // root scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const onResize = (canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  };

  const setCameraPosition = (x: number, y: number, z: number) => {
    camera.position.set(x, y, z);
  };

  // initial camera position
  const cameraOptions = options as {
    cameraPosition?: { x: number; y: number; z: number };
  };
  const initialCameraPosition = cameraOptions?.cameraPosition || {
    x: 0,
    y: 0,
    z: 5,
  };
  setCameraPosition(
    initialCameraPosition.x,
    initialCameraPosition.y,
    initialCameraPosition.z
  );

  scene.add(camera);

  // lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Add spinning logo model for testing. A group is used as a placeholder
  // so rotation can be applied immediately, before the model has finished
  // loading asynchronously.
  const logo = new THREE.Group();
  scene.add(logo);

  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

  const loader = new OBJLoader();
  loader.load(
    '/logo.obj',
    (object) => {
      // Center the loaded model on the origin and scale it to roughly the
      // same size as the test cube it replaced.
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      object.position.sub(center);

      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = maxDimension > 0 ? 2 / maxDimension : 1;
      object.scale.setScalar(scale);

      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      logo.add(object);
    },
    undefined,
    (error) => {
      if (isDebugging) {
        console.error('Failed to load logo model', error);
      }
    }
  );

  // Function to update the logo's rotation based on the elapsed time.
  const updateLogo = (delta: number) => {
    const anglePerSecond = 45;
    const anglePerFrame = THREE.MathUtils.degToRad(anglePerSecond) * delta;
    logo.rotation.x += anglePerFrame;
    logo.rotation.y += anglePerFrame;
  };

  // Main update function that will be called on each animation frame, which currently updates the logo's rotation.
  const update = (delta: number) => {
    updateLogo(delta);
  };

  const render = (renderer: THREE.WebGLRenderer) => {
    renderer.render(scene, camera);
  };

  // Function to handle canvas resizing, updating the camera's aspect ratio and projection matrix accordingly.
  const dispose = () => {
    logo.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
    material.dispose();
  };

  // create a welcome message in the console with styling
  if (isDebugging) {
    console.log(
      '%cThree.js instance created',
      'color: green; font-weight: bold; background: #000; padding: 2px 4px; border-radius: 4px;'
    );
  }

  return {
    update,
    render,
    onResize,
    dispose,
    setCameraPosition,
  };
};

export default createInstance;
export type { TestInstance };
