
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/AppContext";
import { User, Mail, Edit3, ShieldCheck, LogOut } from "lucide-react";
import { useEffect, useState } from "react";


export default function ProfilePage() {
  const { coinBalance, purchasedTickets } = useAppContext();
  const [username, setUsername] = useState("LuckyPlayer123");
  const [email, setEmail] = useState("player@example.com");
  const [isEditing, setIsEditing] = useState(false);

  // Simulate loading user data
  useEffect(() => {
    const storedUsername = localStorage.getItem('ticbit_username');
    const storedEmail = localStorage.getItem('ticbit_email');
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleSave = () => {
    localStorage.setItem('ticbit_username', username);
    localStorage.setItem('ticbit_email', email);
    setIsEditing(false);
    // Here you would typically call an API to save the data
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarImage src={`https://placehold.co/100x100.png?text=${username.charAt(0)}`} alt={username} data-ai-hint="avatar abstract" />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold font-headline text-primary">{username}</CardTitle>
          <CardDescription className="text-muted-foreground">{email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  ) : (
                    <p className="text-foreground">{username}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-muted-foreground" />
                   {isEditing ? (
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  ) : (
                    <p className="text-foreground">{email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{coinBalance}</p>
                <p className="text-sm text-muted-foreground">Coins</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{purchasedTickets.size}</p>
                <p className="text-sm text-muted-foreground">Tickets Purchased</p>
              </div>
            </div>
          </div>
          
          <Separator />

          <div className="space-y-2">
             <Button variant="outline" className="w-full justify-start">
                <ShieldCheck className="mr-2 h-5 w-5 text-accent" /> Security Settings
             </Button>
             <Button variant="destructive" className="w-full justify-start">
                <LogOut className="mr-2 h-5 w-5" /> Log Out
             </Button>
          </div>

        </CardContent>
        <CardFooter>
          {isEditing ? (
             <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">Save Changes</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
              <Edit3 className="mr-2 h-5 w-5" /> Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
