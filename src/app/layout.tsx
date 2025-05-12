import type { Metadata } from 'next';
import ClientThemeProvider from '@/app/components/ClientThemeProvider';
import './global.css';

export const metadata: Metadata = {
  title: 'LuviKunG',
  description: 'If we never step into a certain world, we will never know what\'s inside it',
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
