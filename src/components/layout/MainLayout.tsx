import React from 'react';
import { TopBar } from './TopBar';
import { BottomBar } from './BottomBar';
import { BackToTop } from '../ui/BackToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-bg-main text-white flex flex-col font-sans relative selection:bg-accent/30 selection:text-white transition-colors duration-500">
      <TopBar />
      <main className="flex-1 flex flex-col relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-10">
        {children}
      </main>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BottomBar />
      </div>
      <BackToTop />
    </div>
  );
};

