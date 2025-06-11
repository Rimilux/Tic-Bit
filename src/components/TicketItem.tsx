
"use client";
import React from 'react';
import { Button } from './ui/button';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Ticket, Sparkles } from 'lucide-react';

interface TicketItemProps {
  ticketId: string;
  isPurchased: boolean;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticketId, isPurchased }) => {
  const { buyTicket } = useAppContext();

  const handleBuy = () => {
    buyTicket(ticketId);
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 flex flex-col items-center justify-between shadow-md transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1",
        isPurchased ? "bg-emerald-100 border-emerald-400" : "bg-card border-border"
      )}
    >
      <div className="flex items-center mb-2">
        {isPurchased ? <Sparkles className="w-6 h-6 text-emerald-600 mr-2" /> : <Ticket className="w-6 h-6 text-primary mr-2" />}
        <span className={cn(
          "text-lg font-semibold font-mono",
          isPurchased ? "text-emerald-700" : "text-foreground"
        )}>
          {ticketId}
        </span>
      </div>
      <Button
        onClick={handleBuy}
        disabled={isPurchased}
        variant={isPurchased ? "secondary" : "default"}
        size="sm"
        className={cn(
          "w-full mt-2 transition-colors duration-300",
          isPurchased ? "bg-emerald-500 text-white cursor-not-allowed" : "bg-primary hover:bg-primary/90 text-primary-foreground"
        )}
      >
        {isPurchased ? "Purchased" : "Buy Now (20)"}
      </Button>
    </div>
  );
};
