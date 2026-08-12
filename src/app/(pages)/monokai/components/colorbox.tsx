'use client';

interface ColorBoxProps {
  color: string;
}

export default function ColorBox({ color }: ColorBoxProps) {
  return (
    <button
      style={{
        backgroundColor: color,
      }}
      className='w-12 h-12 rounded border-1 border-gray-300 cursor-pointer hover:border-white transition-colors'
    />
  );
}
