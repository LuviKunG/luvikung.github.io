'use client';

import { useState, useEffect, useCallback } from 'react';
import { Noto_Sans_Mono } from 'next/font/google';

import { useThree, ThreeCanvas, ThreeProvider } from '@luvikung/three-next';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTheme from '@/hooks/useTheme';

import { createInstance, type TestInstance } from './instance';
import useQueryParams from './hooks/useQueryParams';

const notoSansMono = Noto_Sans_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-mono',
});

function PageContent(props: {
  frameRate: number | null;
  setFrameRate: (value: number | null) => void;
  devicePixelRatio: number | null;
  setDevicePixelRatio: (value: number | null) => void;
}) {
  // Access the Three.js instance and related functions from the context.
  const { rendererRef, instanceRef, optionsRef, error, resetError, isReady } =
    useThree<TestInstance>();
  // Access the current theme (light/dark) for styling purposes.
  const theme = useTheme();

  // State to toggle the visibility of the debugging area, hidden by default.
  const [showDebug, setShowDebug] = useState(false);

  // State for camera position controls
  const [cameraPositionY, setCameraPositionY] = useLocalStorage<number>(
    'cameraPositionY',
    0
  );
  // State for camera distance control
  const [cameraPositionZ, setCameraPositionZ] = useLocalStorage<number>(
    'cameraPositionZ',
    5
  );

  // Function to force a lost WebGL context on the Three.js instance, with error handling if the instance or renderer is not available.
  const forceLostContext = useCallback(() => {
    if (!instanceRef.current) {
      console.warn('Instance not available to force lost context');
      return;
    }
    const renderer = rendererRef.current;
    if (!renderer) {
      console.warn('Renderer not available to force lost context');
      return;
    }
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) {
      ext.loseContext();
    }
  }, []);

  // Utility function to simulate a lost WebGL context after a specified delay, then automatically restore it.
  const timeoutLostContext = useCallback((delay: number) => {
    if (!instanceRef.current) {
      console.warn('Instance not available to force lost context');
      return;
    }
    const renderer = rendererRef.current;
    if (!renderer) {
      console.warn('Renderer not available to force lost context');
      return;
    }
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) {
      ext.loseContext();
      setTimeout(() => {
        ext.restoreContext();
      }, delay);
    }
  }, []);

  // Update optionsRef with the latest camera position whenever it changes
  useEffect(() => {
    optionsRef.current = {
      cameraPosition: {
        x: 0,
        y: cameraPositionY,
        z: cameraPositionZ,
      },
    };
  }, [cameraPositionY, cameraPositionZ]);

  // Update camera position on the Three.js instance whenever the camera position state changes.
  useEffect(() => {
    if (!instanceRef.current) return;
    const { setCameraPosition } = instanceRef.current;
    setCameraPosition(0, cameraPositionY, cameraPositionZ);
  }, [cameraPositionY, cameraPositionZ]);

  // Effect to append the stats.js DOM element to the document body when the Three.js instance is ready, and clean up on unmount.
  useEffect(() => {
    if (isReady && instanceRef.current) {
      const { document } = globalThis;
      const { stats } = instanceRef.current;
      if (document && stats && showDebug) {
        const statsDom = stats.dom;
        document.body.appendChild(statsDom);
        stats.showPanel(0); // Show FPS panel
        statsDom.style.position = 'absolute';
        statsDom.style.top = '0px';
        statsDom.style.right = '0px';
        statsDom.style.left = 'auto';
        return () => {
          document.body.removeChild(statsDom);
        };
      }
    }
  }, [isReady, showDebug]);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden transition-colors ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100'
          : 'bg-stone-100 text-slate-900'
      }`}
    >
      <div className='absolute top-0 left-0 h-screen w-screen'>
        {error ? (
          <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center p-4'>
            <div className='max-w-md rounded-lg border p-6 text-center shadow-lg backdrop-blur-sm'>
              <h2 className='mb-4 text-2xl font-bold'>
                An error occurred while loading the 3D scene.
              </h2>
              <p className='text-sm text-gray-500'>
                Please try refreshing the page or check your browser console for
                more details.
              </p>
              <pre
                className={`mt-4 overflow-x-auto rounded p-3 text-left text-xs text-red-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}
              >
                {error.message}
              </pre>
              <button
                onClick={resetError}
                className='mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <ThreeCanvas className='h-full w-full' />
        )}
      </div>
      <button
        onClick={() => setShowDebug(prev => !prev)}
        className={`absolute top-4 left-4 z-20 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur ${
          theme === 'dark'
            ? 'border-white/10 bg-slate-900/65 text-slate-100'
            : 'border-slate-300/70 bg-white/75 text-slate-900'
        }`}
      >
        {showDebug ? 'Hide Debug' : 'Show Debug'}
      </button>
      {showDebug && (
        <div
          className={`absolute top-16 left-4 z-10 flex max-h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-2xl border p-2 shadow-lg backdrop-blur ${
            theme === 'dark'
              ? 'border-white/10 bg-slate-900/65 text-slate-100'
              : 'border-slate-300/70 bg-white/75 text-slate-900'
          }`}
        >
          <div
            className={`scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full min-h-0 flex-1 overflow-y-auto p-2 ${
              theme === 'dark'
                ? 'scrollbar-thumb-slate-500 scrollbar-track-slate-800/40'
                : 'scrollbar-thumb-slate-400 scrollbar-track-slate-200/40'
            }`}
          >
            <div className='max-w-64'>
              <p className='mb-3 text-[0.65rem] leading-snug tracking-wide opacity-60'>
                This demo page supports{' '}
                <span className={notoSansMono.className}>devicePixelRatio</span>{' '}
                and <span className={notoSansMono.className}>frameRate</span>{' '}
                query parameters. You can adjust them in the controls below or
                directly in the URL.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <button
                onClick={forceLostContext}
                className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 text-sm'
              >
                Force Lost Context
              </button>
              <button
                onClick={() => timeoutLostContext(1000)}
                className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 text-sm'
              >
                Timeout Lost Context (1 seconds)
              </button>
            </div>
            <div className='mt-4 border-t border-gray-300/40 pt-4'>
              <p className='mb-3 text-xs font-semibold uppercase tracking-widest opacity-60'>
                Camera Controls
              </p>
              <div className='flex flex-col gap-4'>
                <div>
                  <div className='mb-1 flex items-center justify-between text-xs opacity-70'>
                    <span>Vertical (Y)</span>
                    <span className='font-mono'>
                      {cameraPositionY.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type='range'
                    min={-10}
                    max={10}
                    step={0.1}
                    value={cameraPositionY}
                    onChange={e =>
                      setCameraPositionY(parseFloat(e.target.value))
                    }
                    className='w-full accent-blue-500'
                  />
                </div>
                <div>
                  <div className='mb-1 flex items-center justify-between text-xs opacity-70'>
                    <span>Distance (Z)</span>
                    <span className='font-mono'>
                      {cameraPositionZ.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type='range'
                    min={1}
                    max={20}
                    step={0.1}
                    value={cameraPositionZ}
                    onChange={e =>
                      setCameraPositionZ(parseFloat(e.target.value))
                    }
                    className='w-full accent-blue-500'
                  />
                </div>
              </div>
            </div>
            <div className='mt-4 border-t border-gray-300/40 pt-4'>
              <p className='mb-3 text-xs font-semibold uppercase tracking-widest opacity-60'>
                Renderer Controls
              </p>
              <div>
                <div className='mb-1 flex items-center justify-between text-xs opacity-70'>
                  <span>Frame Rate</span>
                  <span className='font-mono'>{props.frameRate ?? '-'}</span>
                </div>
                <input
                  type='range'
                  min={1}
                  max={120}
                  step={1}
                  value={props.frameRate ?? 0}
                  onChange={e =>
                    props.setFrameRate(parseInt(e.target.value) || null)
                  }
                  className='w-full accent-blue-500'
                />
                <button
                  onClick={() => props.setFrameRate(null)}
                  className='mt-2 rounded bg-gray-500 px-4 py-1 text-xs text-white hover:bg-gray-600'
                >
                  Reset to Default
                </button>
              </div>
              <div>
                <div className='mb-1 flex items-center justify-between text-xs opacity-70'>
                  <span>Device Pixel Ratio</span>
                  <span className='font-mono'>
                    {props.devicePixelRatio?.toFixed(2) ?? '-'}
                  </span>
                </div>
                <input
                  type='range'
                  min={0.1}
                  max={4}
                  step={0.1}
                  value={props.devicePixelRatio ?? 0}
                  onChange={e =>
                    props.setDevicePixelRatio(
                      parseFloat(e.target.value) || null
                    )
                  }
                  className='w-full accent-blue-500'
                />
                <button
                  onClick={() => props.setDevicePixelRatio(null)}
                  className='mt-2 rounded bg-gray-500 px-4 py-1 text-xs text-white hover:bg-gray-600'
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  // Render the ThreeProvider at the root of the component tree, passing the createInstance function to initialize the Three.js instance, and render the PageContent inside it.
  const { window, document } = globalThis;

  const { frameRate, setFrameRate, devicePixelRatio, setDevicePixelRatio } =
    useQueryParams();

  return (
    <ThreeProvider
      window={window}
      document={document}
      onCreate={createInstance}
      disposeOnError={true}
      alpha={0}
      frameRate={frameRate ?? undefined}
      devicePixelRatio={devicePixelRatio ?? undefined}
    >
      <PageContent
        frameRate={frameRate}
        setFrameRate={setFrameRate}
        devicePixelRatio={devicePixelRatio}
        setDevicePixelRatio={setDevicePixelRatio}
      />
    </ThreeProvider>
  );
}
