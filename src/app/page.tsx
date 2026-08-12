'use client';

import { FC as FunctionComponent } from 'react';

import {
  ThreeProvider,
  ThreeCanvas,
  ThreeError,
  useThree,
} from '@luvikung/three-next';

import createThreeInstance from './instance';

const Scene: FunctionComponent = () => {
  const { resetError } = useThree();

  return (
    <>
      <ThreeCanvas className='w-full h-full' />
      <ThreeError className='absolute inset-0 flex items-center justify-center text-white'>
        <div className='text-center'>
          <p>Something went wrong loading the 3D scene.</p>
          <button onClick={resetError} className='underline'>
            Retry
          </button>
        </div>
      </ThreeError>
    </>
  );
};

const Page: FunctionComponent = () => {
  return (
    <div className='relative flex items-center justify-center h-screen'>
      <ThreeProvider onCreate={createThreeInstance}>
        <Scene />
      </ThreeProvider>
    </div>
  );
};

export default Page;
