
"use client";
import React, { useState, useEffect } from 'react';

const messages = [
  "Feeling lucky today?",
  "Next draw in 2 hours!",
  "Special bonus on ticket 777777!",
  "User PlayerX just won 5000 coins!",
  "Buy 5 tickets, get 1 free this week!",
  "Play responsibly.",
];

const generateRandomTicketNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

export const DynamicTicker: React.FC = () => {
  const [tickerItems, setTickerItems] = useState<string[]>([]);

  useEffect(() => {
    const generateItems = () => {
      const items = [];
      for (let i = 0; i < 10; i++) {
        if (Math.random() > 0.5) {
          items.push(messages[Math.floor(Math.random() * messages.length)]);
        } else {
          items.push(`Lottery No: ${generateRandomTicketNumber()}`);
        }
      }
      setTickerItems(items);
    };
    generateItems(); // Initial generation
    
    const intervalId = setInterval(generateItems, 20000); // Refresh items every 20 seconds
    return () => clearInterval(intervalId);
  }, []);


  if (tickerItems.length === 0) {
    return null; // Or a loading state
  }

  return (
    <div className="bg-secondary text-secondary-foreground overflow-hidden whitespace-nowrap py-2 shadow">
      <div className="inline-block ticker-animation">
        {tickerItems.map((item, index) => (
          <span key={index} className="mx-4 text-sm">
            {item}
          </span>
        ))}
         {/* Duplicate items for seamless loop if using CSS only */}
         {tickerItems.map((item, index) => (
          <span key={`dup-${index}`} className="mx-4 text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
