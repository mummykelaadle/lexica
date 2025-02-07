import React, { useState } from "react";

const OnboardingTest: React.FC = () => {
  const questions = [
    {
      question: "Benevolent",
      options: ["Kind and generous", "Evil and cruel", "Lazy and dull", "Strong and powerful"],
      answer: "Kind and generous",
    },
    {
      question: "Obsolete",
      options: ["Modern", "Outdated", "Expensive", "Useful"],
      answer: "Outdated",
    },
    {
      question: "Eloquent",
      options: ["Fluent and expressive", "Clumsy and awkward", "Rude and disrespectful", "Confused and puzzled"],
      answer: "Fluent and expressive",
    },
    {
      question: "She ____ to the market every Sunday.",
      options: ["go", "goes", "gone", "going"],
      answer: "goes",
    },
    {
      question: "If I ____ rich, I would travel the world.",
      options: ["am", "was", "were", "will be"],
      answer: "were",
    },
    {
      question: "The book was written ___ Shakespeare.",
      options: ["in", "by", "with", "for"],
      answer: "by",
    },
    {
      question: "What is the primary theme of the novel '1984'?",
      options: [
        "Totalitarianism and surveillance",
        "Friendship and loyalty",
        "Romantic love and sacrifice",
        "Exploration and adventure"
      ],
      answer: "Totalitarianism and surveillance",
    },
    {
      question: "Which literary device is used in the phrase 'The stars danced in the sky'?",
      options: [
        "Metaphor",
        "Personification",
        "Simile",
        "Hyperbole"
      ],
      answer: "Personification",
    },
    {
      question: "Which of the following best describes the plot of 'The Great Gatsby'?",
      options: [
        "A man’s quest for revenge",
        "A tragic love story set in the Jazz Age",
        "A journey through a magical kingdom",
        "A detective solving a crime"
      ],
      answer: "A tragic love story set in the Jazz Age",
    },
    {
      question: "Write 3-5 sentences on 'My Favorite Hobby'.",
      options: [],
      answer: "",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      alert("Test submitted successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-6 max-w-xl w-full bg-card text-foreground shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4 text-center">Onboarding English Proficiency Test</h2>
        <div className="mb-4 p-4 bg-muted rounded-md shadow-lg">
          <p className="font-semibold text-primary">{currentQuestion + 1}. {questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.length > 0 ? (
            <ul className="list-none pl-0 mt-2">
              {questions[currentQuestion].options.map((option, i) => (
                <li
                  key={i}
                  className={`mt-1 p-2 rounded-md cursor-pointer transition-colors 
                    ${selectedOption === option ? 
                      (option === questions[currentQuestion].answer ? "bg-green-500 text-white" : "bg-red-500 text-white") 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
                  `}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              className="border p-2 w-full bg-background text-foreground"
              placeholder="Write your answer here..."
              onChange={(e) => setSelectedOption(e.target.value)}
            />
          )}
          <button 
            className="mt-4 p-2 bg-primary text-primary-foreground rounded-md transition-colors hover:bg-primary/90 disabled:opacity-50 w-full" 
            onClick={handleNext} 
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1 ? "Submit Test" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTest;

