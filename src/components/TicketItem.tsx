
"use client";
import React from 'react';
import { Button } from './ui/button';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Ticket, Coins, CheckCircle } from 'lucide-react';

interface TicketItemProps {
  ticketId: string;
  isPurchased: boolean;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticketId, isPurchased }) => {
  const { buyTicket } = useAppContext();

  const handleBuy = () => {
    if (!isPurchased) {
      buyTicket(ticketId);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl p-4 flex flex-col items-center justify-between shadow-lg transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 min-h-[180px]",
        isPurchased
          ? "bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-500"
          : "bg-card border border-border hover:border-primary"
      )}
    >
      <div className="flex flex-col items-center mb-3 text-center">
        {isPurchased ? (
          <CheckCircle className="w-8 h-8 text-green-600 mb-2 flex-shrink-0" />
        ) : (
          <Ticket className="w-10 h-10 text-primary mb-2 flex-shrink-0" />
        )}
        <span
          className={cn(
            "text-2xl font-bold font-mono tracking-wider",
            isPurchased ? "text-green-700" : "text-foreground"
          )}
        >
          {ticketId}
        </span>
      </div>
      <Button
        onClick={handleBuy}
        disabled={isPurchased}
        variant={isPurchased ? "secondary" : "default"}
        size="sm"
        className={cn(
          "w-full mt-auto transition-all duration-200 font-semibold",
          isPurchased
            ? "bg-green-500 text-white hover:bg-green-600 cursor-not-allowed"
            : "bg-primary hover:bg-primary/90 text-primary-foreground flex items-center group",
          isPurchased ? "py-2" : "py-2.5" 
        )}
      >
        {isPurchased ? (
          "Owned"
        ) : (
          <>
            <Coins className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-110 flex-shrink-0" />
            Buy for 20
          </>
        )}
      </Button>
    </div>
  );
};
