import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import ShareModal from "./ShareModal";
import ReactConfetti from "react-confetti";
import toast from "react-hot-toast";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRetry }) => {
  // Use state to handle window size dynamically
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    if (score > 6) {
      toast.success("Great job! You did amazing! 🎉");
    } else {
      toast("Keep practicing! You'll do better next time!", {
        icon: "💪",
      });
    }
  }, [score]);
  
  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Card className="text-center p-6">
      <CardContent>
        <h1 className="text-xl font-bold text-foreground">Quiz Finished!</h1>
        <p className="mt-2 text-lg text-primary">
          Your Score: {score} / {totalQuestions}
        </p>
        
        {/* Confetti effect for score above 6 */}
        {score > 6 && <ReactConfetti width={width} height={height} />}

        {score > 6 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mt-4"
          >
            <Sparkles className="text-yellow-400 w-10 h-10" />
            <p className="text-green-600 font-semibold">Congratulations! 🎉</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-red-600 font-semibold"
          >
            Keep Trying! 😊
          </motion.div>
        )}

        <button
          onClick={onRetry}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md transition-colors hover:bg-blue-600"
        >
          Retry Quiz
        </button>

        <ShareModal score={score} total={totalQuestions} />
      </CardContent>
    </Card>
  );
};

export default QuizResult;
