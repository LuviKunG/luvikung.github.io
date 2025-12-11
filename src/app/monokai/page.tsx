'use client';

import { useState } from 'react';
import monokaiColorSchemes from './data/palette';
import ColorBox from './components/colorbox';

export default function Page() {
  const [activeScheme, setActiveScheme] = useState(0);

  const handleColorBoxClick = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        console.log(`Copied to clipboard: ${color}`);
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
  };

  const scheme = monokaiColorSchemes[activeScheme];

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-6xl flex-col items-center py-8 px-8 bg-white dark:bg-black'>
        <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
          Monokai Color Palette
        </h1>

        {/* Color Scheme Switcher */}
        <div className='w-auto mb-6'>
          <div className='flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg justify-center'>
            {monokaiColorSchemes.map((s, index) => (
              <button
                key={s.name}
                onClick={() => setActiveScheme(index)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeScheme === index
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Scheme Colors */}
        <div className='w-full max-w-4xl'>
          <div className='w-full'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4'>
              {scheme.colors.map(color => (
                <div
                  key={color.name}
                  className='flex flex-col items-center cursor-pointer'
                  onClick={() => handleColorBoxClick(color.color)}
                >
                  <ColorBox color={color.color} />
                  <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
                    {color.name}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {color.color}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
