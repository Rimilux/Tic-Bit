
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateEmojiPuzzle, type EmojiPuzzleOutput } from "@/ai/flows/emoji-puzzle-flow";
import { Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function EmojiPuzzlePage() {
  const [puzzleData, setPuzzleData] = useState<EmojiPuzzleOutput | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const { toast } = useToast();

  const fetchNewPuzzle = useCallback(async () => {
    setIsLoading(true);
    setSelectedOption(null);
    setIsCorrect(null);
    setRevealAnswer(false);
    try {
      // Pass an empty object as input if your schema is z.object({})
      const data = await generateEmojiPuzzle({});
      setPuzzleData(data);
    } catch (error) {
      console.error("Failed to fetch emoji puzzle:", error);
      toast({
        title: "Error Loading Puzzle",
        description: "Could not load a new puzzle. Please try again in a moment.",
        variant: "destructive",
      });
      setPuzzleData(null); // Clear puzzle data on error
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNewPuzzle();
  }, [fetchNewPuzzle]);

  const handleOptionClick = (option: string) => {
    if (revealAnswer || !puzzleData) return;

    setSelectedOption(option);
    const correct = option === puzzleData.answer;
    setIsCorrect(correct);
    setRevealAnswer(true);

    toast({
      title: correct ? "That's Right!" : "Not Quite!",
      description: correct 
        ? `Great job! The answer is "${puzzleData.answer}".` 
        : `The correct answer was "${puzzleData.answer}". Better luck next time!`,
      variant: correct ? "default" : "destructive",
    });
  };

  if (isLoading && !puzzleData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-250px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-semibold text-primary">Conjuring up a new Emoji Puzzle...</p>
        <p className="text-muted-foreground">Please wait a moment!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl relative">
        {isLoading && puzzleData && (
            <div className="absolute inset-0 bg-card/70 backdrop-blur-sm flex justify-center items-center z-10 rounded-lg">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold font-headline text-primary">Emoji Puzzle Challenge</CardTitle>
          <CardDescription className="text-muted-foreground">
            What famous phrase, movie, place, or thing do these emojis represent?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 text-center">
          {puzzleData ? (
            <>
              <div 
                className="text-5xl sm:text-6xl p-6 bg-secondary/40 rounded-lg shadow-inner min-h-[100px] flex items-center justify-center" 
                aria-label={`Emoji puzzle: ${puzzleData.emojis}`}
              >
                {puzzleData.emojis}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {puzzleData.options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isActualAnswer = option === puzzleData.answer;
                  
                  let buttonStyle = "outline";
                  if (revealAnswer) {
                    if (isActualAnswer) buttonStyle = "default"; // Highlight correct green
                    if (isSelected && !isActualAnswer) buttonStyle = "destructive"; // Highlight selected wrong red
                  } else if (isSelected) {
                     buttonStyle = "secondary"; // Highlight selected before reveal
                  }

                  return (
                    <Button
                      key={index}
                      variant={buttonStyle as any} // Cast because our logic defines a valid state
                      className={`p-4 h-auto text-base sm:text-lg rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                        ${revealAnswer && isActualAnswer ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' : ''}
                        ${revealAnswer && isSelected && !isActualAnswer ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''}
                        ${revealAnswer && !isSelected && !isActualAnswer ? 'opacity-70' : ''}
                      `}
                      onClick={() => handleOptionClick(option)}
                      disabled={revealAnswer || isLoading}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
              {revealAnswer && (
                <div className="mt-6 p-4 bg-accent/20 rounded-md border border-accent/30">
                  <p className="text-lg font-semibold text-accent-foreground">
                    The answer is: <strong className="text-primary">{puzzleData.answer}</strong>
                  </p>
                </div>
              )}
            </>
          ) : (
            !isLoading && (
              <div className="py-10 text-center">
                <p className="text-xl text-destructive font-semibold">Oops! We couldn't load a puzzle.</p>
                <p className="text-muted-foreground">Please try fetching a new one.</p>
              </div>
            )
          )}
          <Button 
            onClick={fetchNewPuzzle} 
            disabled={isLoading} 
            className="mt-8 w-full sm:w-auto text-lg py-6 sm:py-3 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <RefreshCw className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "Loading..." : "Next Puzzle"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
