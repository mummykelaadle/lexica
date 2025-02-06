import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import NotFoundAnimation from "../animations/NotFoundAnimation";
import NotEnoughWordsPage from "@/animations/NotEnoughWordPage";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const QuizContainer: React.FC = () => {
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
      }
    }
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  if (status === 404) return <NotFoundAnimation />;
  if (status === 202) return <NotEnoughWordsPage />;
  if (error) return <p className="text-destructive">{error}</p>;

  return quizFinished ? (
    <QuizResult score={score} totalQuestions={questions.length} onRetry={handleRetry} />
  ) : (
    questions.length > 0 && (
      <QuizQuestion
        question={`Q${currentQuestionIndex + 1} - ${questions[currentQuestionIndex].text}`}
        options={questions[currentQuestionIndex].options}
        selectedOption={selectedOption}
        correctAnswer={questions[currentQuestionIndex].correctAnswer}
        onSelectOption={handleOptionClick}
        onNext={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    )
  );
};

export default QuizContainer;
