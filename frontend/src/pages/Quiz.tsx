import React, { useEffect, useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/src/questions.json") // Has to removed actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data: Question[]) => setQuestions(data))
      .catch((err) => setError(err.message));
  }, []);

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-dark">Question</h1>
        {error ? (
          <p className="text-destructive">{error}</p>
        ) : (
          questions.length > 0 && (
            <div className="mb-4 p-4 bg-card rounded-md">
              <p className="font-semibold text-primary">{questions[currentQuestionIndex].text}</p>
              <ul className="list-none pl-0 mt-2">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <li
                    key={index}
                    className={`mt-1 p-2 rounded-md cursor-pointer ${
                      selectedOption === option
                        ? option === questions[currentQuestionIndex].correctAnswer
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-neutral"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleNextQuestion}
                className="mt-4 p-2 bg-primary text-white rounded-md"
                disabled={selectedOption === null}
              >
                Next Question
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
