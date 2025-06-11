
"use client";
import React, { useState, useMemo } from 'react';
import { TicketItem } from './TicketItem';
import { PaginationControls } from './PaginationControls';
import { useAppContext } from '@/context/AppContext';

const TOTAL_TICKETS = 10000;
const TICKETS_PER_PAGE = 500;

const generateTicketId = (index: number): string => {
  return (100000 + index).toString();
};

export const LotteryGrid: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { purchasedTickets } = useAppContext();

  const totalPages = Math.ceil(TOTAL_TICKETS / TICKETS_PER_PAGE);

  const currentTickets = useMemo(() => {
    const startIdx = (currentPage - 1) * TICKETS_PER_PAGE;
    const endIdx = startIdx + TICKETS_PER_PAGE;
    return Array.from({ length: TICKETS_PER_PAGE }, (_, i) => {
      const ticketIndex = startIdx + i;
      if (ticketIndex < TOTAL_TICKETS) {
        return generateTicketId(ticketIndex);
      }
      return null;
    }).filter(id => id !== null) as string[];
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-center mb-2 font-headline">Choose Your Lucky Tickets</h2>
        <p className="text-center text-muted-foreground mb-6">Each ticket costs 20 coins. Pick your numbers and win big!</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentTickets.map((ticketId) => (
          <TicketItem 
            key={ticketId} 
            ticketId={ticketId} 
            isPurchased={purchasedTickets.has(ticketId)} 
          />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
