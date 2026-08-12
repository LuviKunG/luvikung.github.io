import { createObjSceneInstance } from '../createInstance';
import type { ObjectThreeInstance } from '../createInstance';

function createInstance(): ObjectThreeInstance {
  return createObjSceneInstance({
    objUrl: '/logo.obj',
    color: 0xffffff,
    fov: 60,
    scale: 0.1,
    enableFlicker: true,
  });
}

export default createInstance;
