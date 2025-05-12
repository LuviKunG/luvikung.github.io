import React, { FC as FunctionComponent, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LuviKunG',
  description: 'LuviKunG\'s profile and portfolio',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'LuviKunG',
    description: 'LuviKunG\'s profile and portfolio',
    url: 'https://luvikung.github.io',
    siteName: 'LuviKunG',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'LuviKunG',
        type: 'image/png',
      }
    ]
  }
};

const Layout: FunctionComponent<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <main>
          {children}
        </main>
        <footer>
        </footer>
      </body>
    </html>
  );
};

export default Layout;