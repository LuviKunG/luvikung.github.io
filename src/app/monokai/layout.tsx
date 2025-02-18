import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LuviKunG - Monokai Color Palette',
  description: 'This is designed for the developers who love Monokai color palette to use in their projects.',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<Readonly<LayoutProps>> = ({ children }) => (
  <>
    {children}
  </>
);

export default Layout;