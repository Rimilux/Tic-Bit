
'use server';
/**
 * @fileOverview Generates emoji puzzles.
 *
 * - generateEmojiPuzzle - A function that creates an emoji puzzle with options and a hint.
 * - EmojiPuzzleInput - The input type for the generateEmojiPuzzle function.
 * - EmojiPuzzleOutput - The return type for the generateEmojiPuzzle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema can be empty if no specific parameters are needed to generate a puzzle
const EmojiPuzzleInputSchema = z.object({});
export type EmojiPuzzleInput = z.infer<typeof EmojiPuzzleInputSchema>;

const EmojiPuzzleOutputSchema = z.object({
  emojis: z.string().describe("A string of emojis forming the puzzle (e.g., '👨‍💻➡️💰')."),
  answer: z.string().describe("The correct word or phrase the emojis represent (e.g., 'Tech Startup')."),
  options: z.array(z.string()).length(4).describe("An array of four string options. One of these options MUST be the 'answer'. The options should be plausible and distinct, and presented in a shuffled order."),
  hint: z.string().describe("A short, helpful clue for the puzzle that doesn't give the answer away directly."),
});
export type EmojiPuzzleOutput = z.infer<typeof EmojiPuzzleOutputSchema>;

// Define the prompt for Gemini
const emojiPuzzlePrompt = ai.definePrompt({
  name: 'emojiPuzzlePrompt',
  input: { schema: EmojiPuzzleInputSchema },
  output: { schema: EmojiPuzzleOutputSchema },
  prompt: `You are an expert puzzle creator specializing in emoji puzzles.
Generate a unique and clever emoji puzzle. The puzzle should represent a common phrase, movie title, book title, person, place, or object.
The puzzle should be relatively easy to solve, suitable for a general audience.

Provide the output in the specified JSON format with the following fields:
1.  'emojis': The string of emojis for the puzzle. Make it visually appealing and not too obscure.
2.  'answer': The correct answer (word or phrase) to the puzzle.
3.  'options': An array of 4 string options.
    - One of these options MUST be the exact 'answer'.
    - The other three options should be plausible but incorrect distractors.
    - The distractors should ideally be related to the theme or category of the answer if possible, to make the puzzle challenging but fair.
    - Ensure the 4 options are distinct and are provided in a shuffled (random) order in the array.
4.  'hint': A short, helpful clue for the puzzle. The hint should guide the player towards the answer without giving it away directly. For example, if the answer is 'Global Popstar', a hint could be 'Sings to the world'.

Examples of good puzzles (but do not repeat these):
- Emojis: "🌎🎶🎤", Answer: "Global Popstar", Options: ["World Music", "Global Popstar", "Travel Blogger", "Planet Anthem"], Hint: "Sings to the world"
- Emojis: "🚀🔭🌌", Answer: "Space Exploration", Options: ["Rocket Science", "Stargazing", "Space Exploration", "Alien Invasion"], Hint: "Journeys beyond Earth"
- Emojis: "📖🧙‍♂️✨", Answer: "Fantasy Novel", Options: ["Magic Show", "History Book", "Fantasy Novel", "Science Fiction"], Hint: "Often involves dragons or wizards"

Ensure the puzzle is different each time you are called. Aim for easy to medium difficulty.
Do not use markdown in your response, only the JSON object.`,
});

// Define the flow
const emojiPuzzleFlow = ai.defineFlow(
  {
    name: 'emojiPuzzleFlow',
    inputSchema: EmojiPuzzleInputSchema,
    outputSchema: EmojiPuzzleOutputSchema,
  },
  async (input) => {
    const { output } = await emojiPuzzlePrompt(input);
    if (!output) {
      throw new Error('Failed to generate emoji puzzle from the model.');
    }
    // Ensure options array truly contains the answer, as a safeguard.
    if (!output.options.includes(output.answer)) {
        console.warn("AI model did not include answer in options. Forcing it by replacing a random option.");
        const randomIndex = Math.floor(Math.random() * output.options.length);
        output.options[randomIndex] = output.answer;
    }
    return output;
  }
);

// Exported wrapper function to be called from the frontend
export async function generateEmojiPuzzle(input: EmojiPuzzleInput): Promise<EmojiPuzzleOutput> {
  return emojiPuzzleFlow(input);
}
