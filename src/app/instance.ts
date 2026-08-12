import type { ThreeInstance } from '@luvikung/three-next';

import { createObjSceneInstance } from './create-obj-scene-instance';

function createThreeInstance(): ThreeInstance {
  return createObjSceneInstance({
    objUrl: '/logo.obj',
    color: 0xffffff,
    fov: 60,
    scale: 0.1,
    enableFlicker: true,
  });
}

export default createThreeInstance;
