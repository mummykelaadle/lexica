import { getColorForDifficulty } from "@/lib/getWordColors";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

interface WordCardProps {
    word: string;
    difficulty: number;
    _id: string;
}

function WordCard({ word, difficulty, _id }: WordCardProps) {
    const customWordColor = getColorForDifficulty(difficulty);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/meaning/${word}`);
    }, [navigate, word]);

    return (
        <div
            key={_id}
            onClick={handleClick}
            className="transition-transform hover:scale-105 w-fit p-2"
            style={{
                fontSize: `${difficulty * 5 + 1}em`,
                color: customWordColor,
            }}
        >
            {word}
        </div>
    );
}

export default WordCard;
