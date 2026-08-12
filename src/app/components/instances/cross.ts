import { createObjSceneInstance } from '../createInstance';
import type { ObjectThreeInstance } from '../createInstance';

function createInstance(): ObjectThreeInstance {
  return createObjSceneInstance({
    objUrl: '/cross.obj',
    color: 0xff0000,
    fov: 90,
    scale: 1.0,
  });
}

export default createInstance;
