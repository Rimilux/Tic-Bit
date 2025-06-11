
import { LotteryGrid } from '@/components/LotteryGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GamesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-headline text-primary">Welcome to Tic Bit Lottery!</CardTitle>
        </CardHeader>
        <CardContent>
          <LotteryGrid />
        </CardContent>
      </Card>
    </div>
  );
}
