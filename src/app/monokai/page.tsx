'use client';

import monokaiColorSchemes from './data/palette';
import ColorBox from './components/colorbox';

export default function Page() {
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

  return (
    <div className='p-6 font-sans bg-gray-900 min-h-screen text-white'>
      <h1 className='text-4xl font-bold mb-8 text-white'>
        Monokai Color Palette
      </h1>
      <div className='flex flex-col gap-8'>
        {monokaiColorSchemes.map(scheme => (
          <div key={scheme.name} className='mb-6'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-200'>
              {scheme.name}
            </h2>
            <div className='flex flex-wrap gap-3'>
              {scheme.colors.map(color => (
                <div
                  key={color.name}
                  className='relative'
                  onClick={() => handleColorBoxClick(color.color)}
                >
                  <ColorBox color={color.color} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
