import React from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOption,
  correctAnswer,
  onSelectOption,
  onNext,
  isLastQuestion,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-foreground">Question</h1>
      <div className="mb-4 p-4 bg-card rounded-md">
        <p className="font-semibold text-primary">{question}</p>
        <ul className="list-none pl-0 mt-2">
          {options.map((option, index) => (
            <li
              key={index}
              className={`mt-1 p-2 rounded-md cursor-pointer transition-colors
                ${
                  selectedOption === option
                    ? option === correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              onClick={() => onSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <button
          onClick={onNext}
          className="mt-4 p-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90 disabled:opacity-50"
          disabled={selectedOption === null}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
