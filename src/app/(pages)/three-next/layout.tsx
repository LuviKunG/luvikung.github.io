import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'three-next Demo Page',
  description:
    'A demo page for the three-next library showcasing 3D rendering capabilities.',
  authors: [
    {
      name: 'Thanut Panichyotai (@LuviKunG)',
      url: 'https://luvikung.github.io',
    },
  ],
  icons: {
    icon: '/three-next/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
