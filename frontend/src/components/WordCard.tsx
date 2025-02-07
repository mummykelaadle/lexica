import { getColorForDifficulty } from "@/lib/getWordColors";
import { useNavigate } from "react-router-dom";
import { useCallback, forwardRef, useState } from "react";
import { WordMeaningDialog } from "./WordMeaningDialog";

interface WordInterface{
  _id:number;
  word:string;
  meanings:string[];
  synonyms:string[];
  antonyms:string[];
  exampleSentences:string[];
  difficulty:number
}

interface WordCardProps extends React.InputHTMLAttributes<HTMLDivElement> {
  word: WordInterface;
}

const WordCard = forwardRef<HTMLDivElement, WordCardProps>(
  ({ word, ...props }, ref) => {
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    const customWordColor = getColorForDifficulty(word.difficulty);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      setIsDialogOpen(true);
    }, [navigate, word]);

    return (
      <>
      <div
        key={word._id}
        ref={ref}
        onClick={handleClick}
        className="transition-transform hover:scale-105 w-fit p-2"
        style={{
          fontSize: `${word.difficulty*3 + 1}rem`,
          color: customWordColor,
        }}
        {...props}
      >
        {word.word}
      </div>
      <WordMeaningDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} word={word.word}/>
      </>
    );
  }
);

export default WordCard;
