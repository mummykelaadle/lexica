import React, { useEffect, useState } from "react";
import NotFoundAnimation from "../animations/NotFoundAnimation";
import { useAuth } from "@clerk/clerk-react";
import NotEnoughWordsPage from "@/animations/NotEnoughWordPage";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const QuestionsPage: React.FC = () => {
  const { userId, getToken } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    getToken()
      .then((token) => {
        if (userId) {
          fetch(`http://localhost:5000/api/v1/quiz-questions?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((response) => {
              setStatus(response.status);
              if (response.status === 404) throw new Error("No questions found");
              if (response.status === 202) return [];
              if (!response.ok) throw new Error("Failed to fetch questions");
              return response.json();
            })
            .then((data: Question[]) => setQuestions(data))
            .catch((err) => setError(err.message));
        } else {
          setError("User ID is required");
        }
      })
      .catch(() => setError("Failed to retrieve authentication token"));
  }, [getToken, userId]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== option) {
      if (option === questions[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      } else if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => Math.max(0, prevScore - 1));
      }
    }
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
  };

  const handleRetry = () => {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background transition-colors">
      <div className="p-6 max-w-lg bg-card shadow-lg rounded-lg border border-border transition-colors">
        {status === 404 ? (
          <NotFoundAnimation />
        ) : status === 202 ? (
          <NotEnoughWordsPage />
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : quizFinished ? (
          <Card className="text-center p-6">
            <CardContent>
              <h1 className="text-xl font-bold text-foreground">Quiz Finished!</h1>
              <p className="mt-2 text-lg text-primary">Your Score: {score} / {questions.length}</p>
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
                onClick={handleRetry}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md transition-colors hover:bg-blue-600"
              >
                Retry Quiz
              </button>
            </CardContent>
          </Card>
        ) : questions.length > 0 ? (
          <div>
            <h1 className="text-xl font-bold mb-4 text-foreground">Question</h1>
            <div className="mb-4 p-4 bg-card rounded-md">
              <p className="font-semibold text-primary">
                Q{currentQuestionIndex + 1} - {questions[currentQuestionIndex].text}
              </p>
              <ul className="list-none pl-0 mt-2">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <li
                    key={index}
                    className={`mt-1 p-2 rounded-md cursor-pointer transition-colors
                      ${
                        selectedOption === option
                          ? option === questions[currentQuestionIndex].correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 p-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90 disabled:opacity-50"
                  disabled={selectedOption === null}
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="mt-4 p-2 bg-green-600 text-white rounded-md transition-colors hover:bg-green-700"
                >
                  Finish Quiz
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionsPage;
