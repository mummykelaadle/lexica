import { getColorForDifficulty } from "@/lib/getWordColors";
import { useNavigate } from "react-router-dom";
import { useCallback, forwardRef } from "react";

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
    const customWordColor = getColorForDifficulty(word.difficulty);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      navigate(`/meaning/${word.word}`);
    }, [navigate, word]);

    return (
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
    );
  }
);

export default WordCard;
