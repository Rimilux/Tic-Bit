
"use client";

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const TICKET_PRICE = 20;
const SIGNUP_BONUS = 100;

interface AppContextType {
  coinBalance: number;
  purchasedTickets: Set<string>;
  buyTicket: (ticketId: string) => boolean;
  lastWinningTicket: string;
  setLastWinningTicket: (ticketId: string) => void;
  addCoins: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coinBalance, setCoinBalance] = useState(SIGNUP_BONUS);
  const [purchasedTickets, setPurchasedTickets] = useState<Set<string>>(new Set());
  const [lastWinningTicket, setLastWinningTicketState] = useState<string>("XXXXXX");
  const { toast } = useToast();

  // Load state from localStorage on mount
  useEffect(() => {
    const storedBalance = localStorage.getItem('ticbit_coinBalance');
    if (storedBalance) {
      setCoinBalance(Number(storedBalance));
    } else {
      setCoinBalance(SIGNUP_BONUS); // Ensure signup bonus if nothing stored
    }

    const storedTickets = localStorage.getItem('ticbit_purchasedTickets');
    if (storedTickets) {
      setPurchasedTickets(new Set(JSON.parse(storedTickets)));
    }
    
    const storedWinningTicket = localStorage.getItem('ticbit_lastWinningTicket');
    if (storedWinningTicket) {
      setLastWinningTicketState(storedWinningTicket);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ticbit_coinBalance', String(coinBalance));
  }, [coinBalance]);

  useEffect(() => {
    localStorage.setItem('ticbit_purchasedTickets', JSON.stringify(Array.from(purchasedTickets)));
  }, [purchasedTickets]);
  
  useEffect(() => {
    localStorage.setItem('ticbit_lastWinningTicket', lastWinningTicket);
  }, [lastWinningTicket]);


  const buyTicket = useCallback((ticketId: string) => {
    if (purchasedTickets.has(ticketId)) {
      toast({ title: "Already Purchased", description: "You have already bought this ticket.", variant: "default" });
      return false;
    }
    if (coinBalance >= TICKET_PRICE) {
      setCoinBalance((prev) => prev - TICKET_PRICE);
      setPurchasedTickets((prev) => new Set(prev).add(ticketId));
      toast({ title: "Ticket Purchased!", description: `Successfully bought ticket ${ticketId}.`, variant: "default" });
      return true;
    } else {
      toast({ title: "Insufficient Coins", description: "You don't have enough coins to buy this ticket.", variant: "destructive" });
      return false;
    }
  }, [coinBalance, purchasedTickets, toast]);

  const addCoins = useCallback((amount: number) => {
    setCoinBalance((prev) => prev + amount);
    toast({ title: "Coins Added!", description: `${amount} coins have been added to your wallet.`, variant: "default" });
  }, [toast]);

  const setLastWinningTicket = useCallback((ticketId: string) => {
    setLastWinningTicketState(ticketId);
  }, []);

  return (
    <AppContext.Provider value={{ coinBalance, purchasedTickets, buyTicket, lastWinningTicket, setLastWinningTicket, addCoins }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
