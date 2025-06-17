
"use client";
import Link from 'next/link';
import { Gamepad2, ListChecks, UserCircle, CircleDollarSign, Ticket } from 'lucide-react'; // Added Ticket, removed Home
import { useAppContext } from '@/context/AppContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Tickets', icon: Ticket, color: 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-400 text-white' },
  { href: '/emoji-puzzle', label: 'Games', icon: Gamepad2, color: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400 text-white' },
  { href: '/tasks', label: 'Tasks', icon: ListChecks, color: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400 text-white' },
  { href: '/profile', label: 'Profile', icon: UserCircle, color: 'bg-amber-400 hover:bg-amber-500 focus:ring-amber-300 text-slate-900' },
  { href: '/wallet', label: 'Wallet', icon: CircleDollarSign, color: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-slate-900', isWallet: true },
];

export const Navigation: React.FC = () => {
  const { coinBalance } = useAppContext();
  const pathname = usePathname();

  return (
    <nav className="bg-card shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href; // Simplified active state logic
            return (
            <Link 
              href={item.href} 
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                item.color,
                isActive ? "ring-2 ring-offset-2 ring-primary" : "opacity-90 hover:opacity-100",
                "min-w-[70px] sm:min-w-[80px]" // Adjusted min-width slightly for potentially 5 items
              )}
              aria-label={item.label}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs sm:text-sm font-medium">
                {item.label}
                {item.isWallet && ` (${coinBalance})`}
              </span>
            </Link>
          )}
          )}
        </div>
      </div>
    </nav>
  );
};
