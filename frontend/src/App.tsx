import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordMeaningPage from "./pages/WordMeaningPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/meaning/:word" element={<WordMeaningPage />} /> {/* Home Page */}
      </Routes>
    </Router>
  );
};

export default App;
