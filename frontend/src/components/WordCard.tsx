import { getColorForDifficulty } from "@/lib/getWordColors";
import { useNavigate } from "react-router-dom";
import { useCallback, forwardRef } from "react";

interface WordCardProps extends React.InputHTMLAttributes<HTMLDivElement> {
  word: string;
  difficulty: number;
  _id: string;
}

const WordCard = forwardRef<HTMLDivElement, WordCardProps>(
  ({ word, difficulty, _id, ...props }, ref) => {
    const customWordColor = getColorForDifficulty(difficulty);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      navigate(`/meaning/${word}`);
    }, [navigate, word]);

    return (
      <div
        key={_id}
        ref={ref}
        onClick={handleClick}
        className="transition-transform hover:scale-105 w-fit p-2"
        style={{
          fontSize: `${difficulty * 5 + 1}em`,
          color: customWordColor,
        }}
        {...props}
      >
        {word}
      </div>
    );
  }
);

export default WordCard;
