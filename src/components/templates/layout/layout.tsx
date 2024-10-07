import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <div className="min-h-screen min-w-full flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
