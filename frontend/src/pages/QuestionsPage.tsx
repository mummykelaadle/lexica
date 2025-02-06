import React from "react";
import QuizContainer from "@/components/QuizContainer";

const QuestionsPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background transition-colors">
      <div className="p-6 max-w-lg bg-card shadow-lg rounded-lg border border-border transition-colors">
        <QuizContainer />
      </div>
    </div>
  );
};

export default QuestionsPage;
