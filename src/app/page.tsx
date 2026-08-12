'use client';

import { FC as FunctionComponent, useEffect } from 'react';

import useTheme from '@/hooks/useTheme';

import type { ObjectThreeInstance } from './components/createInstance';

import {
  ThreeProvider,
  ThreeCanvas,
  ThreeError,
  useThree,
} from '@luvikung/three-next';

import createInstance from './components/instances/logo';

const hexToNumber = (hex: string) => parseInt(hex.replace('#', ''), 16);

const Scene: FunctionComponent = () => {
  const { resetError, instanceRef } = useThree<ObjectThreeInstance>();

  const theme = useTheme();

  useEffect(() => {
    if (instanceRef.current) {
      const color = theme === 'dark' ? '#ffffff' : '#333333';
      instanceRef.current.setColor(hexToNumber(color));
    }
  }, [theme]);

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
      <ThreeProvider onCreate={createInstance}>
        <Scene />
      </ThreeProvider>
    </div>
  );
};

export default Page;
