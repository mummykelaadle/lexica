import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import ShareModal from "./ShareModal";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRetry }) => {
  return (
    <Card className="text-center p-6">
      <CardContent>
        <h1 className="text-xl font-bold text-foreground">Quiz Finished!</h1>
        <p className="mt-2 text-lg text-primary">
          Your Score: {score} / {totalQuestions}
        </p>
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
        <ShareModal score={score} total={10} />
      </CardContent>
    </Card>
  );
};

export default QuizResult;
