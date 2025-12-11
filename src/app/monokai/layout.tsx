import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monokai Theme',
  description: 'A Monokai theme palette for the application.',
  authors: [
    {
      name: 'Thanut Panichyotai (@LuviKunG)',
      url: 'https://luvikung.github.io',
    },
  ],
  icons: {
    icon: '/monokai/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
