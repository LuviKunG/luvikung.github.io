'use client';

import { FC as FunctionComponent } from 'react';
import Link from 'next/link';

import {
  ThreeProvider,
  ThreeCanvas,
  ThreeError,
  useThree,
} from '@luvikung/three-next';

import createCrossInstance from './not-found-instance';

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

const NotFound: FunctionComponent = () => {
  return (
    <div className='relative flex items-center justify-center h-screen'>
      <ThreeProvider onCreate={createCrossInstance}>
        <Scene />
      </ThreeProvider>
      <div className='absolute text-white' style={{ zIndex: 1, bottom: '1em' }}>
        <h1 className='flexbox text-center text-2xl font-semibold'>
          Not Found
        </h1>
        <p className='flexbox text-center'>
          <Link href='/' className='text-gray-500 underline'>
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
