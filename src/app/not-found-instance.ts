import type { ThreeInstance } from '@luvikung/three-next';

import { createObjSceneInstance } from './create-obj-scene-instance';

function createCrossInstance(): ThreeInstance {
  return createObjSceneInstance({
    objUrl: '/cross.obj',
    color: 0xff0000,
    fov: 90,
    scale: 1.0,
  });
}

export default createCrossInstance;
