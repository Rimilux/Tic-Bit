
"use client";
import { useAppContext } from '@/context/AppContext';

export const WinningTicketBanner: React.FC = () => {
  const { lastWinningTicket } = useAppContext();
  return (
    <header className="bg-red-600 text-white p-3 text-center shadow-md">
      <h1 className="text-xl font-bold font-headline">
        Last Winning Ticket: <span className="text-yellow-300">{lastWinningTicket}</span>
      </h1>
    </header>
  );
};
