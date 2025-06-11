
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle, Share2, UserPlus, Gift } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: React.ElementType;
  actionText: string;
}

const initialTasks: Task[] = [
  { id: 'share', title: "Share on Social Media", description: "Share Tic Bit with your friends on your favorite social platform.", reward: 20, icon: Share2, actionText: "Share Now" },
  { id: 'refer', title: "Refer a Friend", description: "Invite a friend to join Tic Bit. You both get rewarded!", reward: 50, icon: UserPlus, actionText: "Refer Friend" },
  { id: 'daily', title: "Daily Check-in", description: "Visit us daily and claim a small bonus.", reward: 10, icon: Gift, actionText: "Check-in" },
];

export default function TasksPage() {
  const { addCoins } = useAppContext();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const handleCompleteTask = (task: Task) => {
    if (!completedTasks.has(task.id)) {
      addCoins(task.reward);
      setCompletedTasks(prev => new Set(prev).add(task.id));
    }
  };
  
  // For daily check-in, persist completion state
  useState(() => {
    const today = new Date().toDateString();
    const lastCheckin = localStorage.getItem('ticbit_dailyCheckin');
    if (lastCheckin === today) {
      setCompletedTasks(prev => new Set(prev).add('daily'));
    }
  });

  const completeDailyCheckin = (task: Task) => {
     if (!completedTasks.has(task.id)) {
      addCoins(task.reward);
      const today = new Date().toDateString();
      localStorage.setItem('ticbit_dailyCheckin', today);
      setCompletedTasks(prev => new Set(prev).add(task.id));
    }
  }


  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-headline text-primary">Complete Tasks, Earn Coins!</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Boost your coin balance by completing simple tasks.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialTasks.map((task) => {
            const IconComponent = task.icon;
            const isCompleted = completedTasks.has(task.id);
            return (
              <Card key={task.id} className={isCompleted ? "bg-green-50 border-green-200" : ""}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className={`w-8 h-8 ${isCompleted ? 'text-green-600' : 'text-accent'}`} />
                    <CardTitle className="text-xl">{task.title}</CardTitle>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => task.id === 'daily' ? completeDailyCheckin(task) : handleCompleteTask(task)}
                    disabled={isCompleted}
                    variant={isCompleted ? "secondary" : "default"}
                  >
                    {isCompleted ? <CheckCircle className="mr-2 h-5 w-5" /> : <IconComponent className="mr-2 h-5 w-5" />}
                    {isCompleted ? `Earned ${task.reward} Coins` : `${task.actionText} (+${task.reward} Coins)`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
