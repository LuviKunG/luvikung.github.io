import { ThreeInstance } from '@luvikung/three-next';

type TestInstance = ThreeInstance & {
  setCameraPosition: (x: number, y: number, z: number) => void;
};

export type { TestInstance };
