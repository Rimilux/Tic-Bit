
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { CircleDollarSign, PlusCircle, ArrowDownCircle, ArrowUpCircle, History } from "lucide-react";
import Image from "next/image";

// Mock transactions
const mockTransactions = [
  { id: '1', type: 'deposit', description: "Sign-up Bonus", amount: 100, date: "2024-07-28" },
  { id: '2', type: 'purchase', description: "Ticket #100001", amount: -20, date: "2024-07-28" },
  { id: '3', type: 'reward', description: "Task: Share", amount: 20, date: "2024-07-29" },
  { id: '4', type: 'purchase', description: "Ticket #100005", amount: -20, date: "2024-07-29" },
];

export default function WalletPage() {
  const { coinBalance } = useAppContext();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-lg mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <CircleDollarSign className="w-20 h-20 text-yellow-500" />
          </div>
          <CardTitle className="text-4xl font-bold font-headline text-primary">My Wallet</CardTitle>
          <CardDescription className="text-muted-foreground">Manage your coins and view your transaction history.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-sm uppercase tracking-wider mb-1">Current Balance</p>
            <p className="text-5xl font-bold">{coinBalance} <span className="text-3xl">Coins</span></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="flex-col h-auto py-4">
              <PlusCircle className="w-8 h-8 mb-2 text-emerald-500" />
              <span className="text-sm">Add Coins</span>
            </Button>
            <Button variant="outline" size="lg" className="flex-col h-auto py-4">
              <ArrowDownCircle className="w-8 h-8 mb-2 text-red-500" />
               <span className="text-sm">Withdraw (Soon)</span>
            </Button>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <History className="w-6 h-6 mr-2 text-muted-foreground" />
              Transaction History
            </h3>
            {mockTransactions.length > 0 ? (
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {mockTransactions.map(tx => (
                  <li key={tx.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center">
                      {tx.type === 'deposit' || tx.type === 'reward' ? (
                        <ArrowUpCircle className="w-5 h-5 mr-3 text-emerald-500" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 mr-3 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Coins
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No transactions yet.</p>
            )}
          </div>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
                Coin transactions are for in-app use only.
            </p>
         </CardFooter>
      </Card>
    </div>
  );
}
