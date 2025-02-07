import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import NotFoundAnimation from "../animations/NotFoundAnimation";
import NotEnoughWordsPage from "@/animations/NotEnoughWordPage";
import toast from "react-hot-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

const SpaceRepetitionQuizContainer: React.FC = () => {
  const { userId, getToken } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | null }>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [userId, getToken]);
  
  const handleOptionClick = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  
  };
  
  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
      handleSubmitQuiz(); // Automatically submit when the last question is answered
    }
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    const toastId = toast.loading("Submitting quiz...");
  
    const results = questions.map((question, index) => ({
      wordId: question.id,
      isCorrect: question.correctAnswer === answers[index],
    }));
  
    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:5000/api/v1/quiz-questions/spacedQuizResult/?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, results }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to submit quiz results");
      }
  
      const data = await response.json();
      console.log("Spaced repetition results saved:", data);
      // Dismiss loading toast and show success message
    toast.dismiss(toastId);
    toast.success("Quiz results saved successfully!");
    } catch (err) {
      console.error("Error saving spaced repetition result:", err);
      toast.error("Failed to save quiz results.");
    } finally {
      toast.dismiss(toastId); // Remove loading toast
      setIsSubmitting(false);
    }
  };
  

  const fetchQuestions = () => {
    if (!userId) {
      setError("User ID is required");
      toast.error("User ID is required");
      return;
    }
  
    let isMounted = true;
  
    // Show loading toast and store its ID
    const toastId = toast.loading("Loading questions...");
  
    getToken()
      .then((token) =>
        fetch(`http://localhost:5000/api/v1/quiz-questions/spacedQuiz/?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        if (!isMounted) return;
        setStatus(response.status);
  
        if (response.status === 404) {
          throw new Error("No questions found");
        }
        if (response.status === 202) return [];
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data: Question[]) => {
        if (isMounted) {
          setQuestions(data);
          toast.dismiss(toastId);
          toast.success("Questions loaded successfully!");
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          toast.dismiss(toastId);
          toast.error(err.message);
        }
      });
  
    return () => {
      isMounted = false;
    };
  };
  
  
  const handleRetry = () => {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    fetchQuestions();
    toast.success("Quiz restarted!");
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
        selectedOption={answers[currentQuestionIndex] || null}
        correctAnswer={questions[currentQuestionIndex].correctAnswer}
        onSelectOption={handleOptionClick}
        onNext={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    )
  );
};

export default SpaceRepetitionQuizContainer;
