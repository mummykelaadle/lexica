import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import NotFoundAnimation from "../animations/NotFoundAnimation";
import NotEnoughWordsPage from "@/animations/NotEnoughWordPage";
import toast from "react-hot-toast";

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
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  // Fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, [getToken, userId]);
  
  // Track selected option per question
  const handleOptionClick = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  // Move to the next question or finish quiz
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      calculateScore();
      handleSubmitQuiz(); // Automatically submit quiz on last question
    }
  };

  // Calculate score based on correct answers
  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  // Submit quiz results to backend
  const handleSubmitQuiz = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    // Store the toast ID so we can dismiss it later
    const toastId = toast.loading("Submitting quiz...");
  
    const results = questions.map((question, index) => ({
      wordId: question.id,
      isCorrect: selectedOptions[index] === question.correctAnswer,
    }));
  
    getToken()
      .then((token) => {
        return fetch(`http://localhost:5000/api/v1/quiz-questions/spacedQuizResult/?userId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, results }),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Spaced repetition results saved:", data);
  
        // Dismiss loading toast and show success message
        toast.dismiss(toastId);
        toast.success("Quiz results saved successfully!");
      })
      .catch((err) => {
        console.error("Error saving spaced repetition result:", err);
  
        // Dismiss loading toast and show error message
        toast.dismiss(toastId);
        toast.error("Failed to save quiz results.");
      })
      .finally(() => setIsSubmitting(false));
  };
  
  
  const fetchQuestions = () => {
    getToken()
      .then((token) => {
        if (userId) {
          return fetch(`http://localhost:5000/api/v1/quiz-questions?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error("User ID is required");
        }
      })
      .then((response) => {
        setStatus(response.status);
        if (response.status === 404) {
          toast.error("No questions found!");
          throw new Error("No questions found");
        }
        if (response.status === 202) return [];
        if (!response.ok) {
          toast.error("Failed to fetch questions");
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data: Question[]) => setQuestions(data))
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };
  
  // Reset quiz
  const handleRetry = () => {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOptions({});
    fetchQuestions(); // Fetch fresh questions from the backend
    toast.success("Quiz restarted!");
  };
  
  // Handle cases where there are no questions or errors
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
        selectedOption={selectedOptions[currentQuestionIndex] || null}
        correctAnswer={questions[currentQuestionIndex].correctAnswer}
        onSelectOption={handleOptionClick}
        onNext={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    )
  );
};

export default QuizContainer;
