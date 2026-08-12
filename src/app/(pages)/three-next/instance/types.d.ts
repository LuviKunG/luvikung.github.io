import { ThreeInstance } from '@luvikung/three-next';
import stats from 'stats.js';

type TestInstance = ThreeInstance & {
  stats: stats;
  setCameraPosition: (x: number, y: number, z: number) => void;
};

export type { TestInstance };
