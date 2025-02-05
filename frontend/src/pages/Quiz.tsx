import React, { useEffect, useState } from "react";
import NotFoundAnimation from "../animations/NotFoundAnimation"
import { useAuth } from "@clerk/clerk-react"; // Clerk hook to access user info
import NotEnoughWordsPage from "@/animations/NotEnoughWordPage";

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
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null); // Store status code

  useEffect(() => {
    // Get the Clerk token and userId
    getToken()
      .then((token) => {
        if (userId) {
          fetch(`http://localhost:5000/api/v1/quiz-questions?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the header
            },
          })
            .then((response) => {
              setStatus(response.status); // Store the status code

              if (response.status === 404) {
                throw new Error("No questions found");
              }
              if (response.status === 202) {
      return []; // Return an empty array instead of null
    }
              if (!response.ok) {
                throw new Error("Failed to fetch questions");
              }
             
              return response.json();
            })
            .then((data: Question[]) => setQuestions(data))
            .catch((err) => setError(err.message));
        } else {
          setError("User ID is required");
        }
      })
      .catch((err) => setError("Failed to retrieve authentication token"));
  }, [getToken, userId]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background transition-colors">
      <div className="p-6 max-w-lg bg-card shadow-lg rounded-lg border border-border transition-colors">
      
        {/* Status-based Rendering */}
        {status === 404 ? (
          <NotFoundAnimation />
        ) : status === 202 ? (
          <NotEnoughWordsPage />
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ): (
          questions.length > 0 && (
          <div>
           <h1 className="text-xl font-bold mb-4 text-foreground">Question</h1>
            <div className="mb-4 p-4 bg-card rounded-md">
              <p className="font-semibold text-primary">
                {questions[currentQuestionIndex].text}
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

              <button
                onClick={handleNextQuestion}
                className="mt-4 p-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90 disabled:opacity-50"
                disabled={selectedOption === null}
              >
                Next Question
              </button>
            </div>
          </div>
           
          )
        )}
      </div>
    </div>
  );
};


export default QuestionsPage;
