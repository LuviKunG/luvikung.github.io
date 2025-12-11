import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Texture Manipulator',
  description: 'A web application for manipulating textures channels.',
  authors: [
    {
      name: 'Thanut Panichyotai (@LuviKunG)',
      url: 'https://luvikung.github.io',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
