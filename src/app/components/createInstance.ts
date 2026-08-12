import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/Addons.js';

import type { ThreeInstance } from '@luvikung/three-next';

type ObjectThreeInstance = ThreeInstance & {
  setColor: (color: number) => void;
};

export interface ObjSceneConfig {
  objUrl: string;
  color: number;
  fov: number;
  scale: number;
  enableFlicker?: boolean;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Shared factory behind both the home page's logo scene and the not-found
 * page's cross scene: loads a single .obj mesh, gives it a random per-axis
 * spin, and optionally flickers its material between solid and wireframe.
 */
export function createObjSceneInstance(
  config: ObjSceneConfig
): ObjectThreeInstance {
  const { objUrl, color, fov, scale, enableFlicker = false } = config;

  // Set up the camera and scene
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 5;

  const scene = new THREE.Scene();

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  // Solid material
  const solidMaterial = new THREE.MeshPhongMaterial({
    color,
    flatShading: true,
  });

  // Wireframe material, only needed when flickering between the two
  const wireframeMaterial = enableFlicker
    ? new THREE.MeshPhongMaterial({
        color,
        flatShading: true,
        wireframe: true,
      })
    : null;

  let mesh: THREE.Group | null = null;
  let rotationSpeed = { x: 0, y: 0, z: 0 };
  let flickerTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const applyMaterial = (material: THREE.Material) => {
    mesh?.traverse(child => {
      const m = child as THREE.Mesh;
      if (m.isMesh) {
        m.material = material;
      }
    });
  };

  const tickFlicker = () => {
    flickerTimeoutId = setTimeout(tickFlicker, 150 * Math.random());
    applyMaterial(Math.random() > 0.1 ? solidMaterial : wireframeMaterial!);
  };

  // Load mesh and add to scene
  const loader = new OBJLoader();
  loader.load(objUrl, loaded => {
    loaded.traverse(child => {
      const m = child as THREE.Mesh;
      if (m.isMesh) {
        m.material = solidMaterial;
      }
    });
    loaded.position.set(0, 0, 0);
    loaded.scale.set(scale, scale, scale);
    scene.add(loaded);
    mesh = loaded;

    const delta = 0.2;
    rotationSpeed = {
      x: lerp(delta, -delta, Math.random()),
      y: lerp(delta, -delta, Math.random()),
      z: lerp(delta, -delta, Math.random()),
    };

    if (enableFlicker) {
      tickFlicker();
    }
  });

  // Called every frame with delta time in seconds
  const update = (delta: number) => {
    if (!mesh) return;
    mesh.rotation.x += rotationSpeed.x * delta;
    mesh.rotation.y += rotationSpeed.y * delta;
    mesh.rotation.z += rotationSpeed.z * delta;
  };

  // Responsible for actually drawing the frame
  const render = (renderer: THREE.WebGLRenderer) => {
    renderer.render(scene, camera);
  };

  // Called on mount and whenever the canvas element changes size
  const onResize = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    if (height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const setColor = (newColor: number) => {
    solidMaterial.color.set(newColor);
    if (wireframeMaterial) {
      wireframeMaterial.color.set(newColor);
    }
  };

  // Release GPU resources and stop the flicker tick
  const dispose = () => {
    if (flickerTimeoutId !== null) {
      clearTimeout(flickerTimeoutId);
    }
    solidMaterial.dispose();
    wireframeMaterial?.dispose();
    mesh?.traverse(child => {
      const m = child as THREE.Mesh;
      if (m.isMesh) {
        m.geometry.dispose();
      }
    });
  };

  return { update, render, onResize, setColor, dispose };
}

export type { ObjectThreeInstance };
