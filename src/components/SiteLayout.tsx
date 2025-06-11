
import type React from 'react';
import { WinningTicketBanner } from './WinningTicketBanner';
import { DynamicTicker } from './DynamicTicker';
import { Navigation } from './Navigation';

export const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <WinningTicketBanner />
      <DynamicTicker />
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary/80 text-primary-foreground p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Tic Bit. All rights reserved. Play responsibly.</p>
      </footer>
    </div>
  );
};
