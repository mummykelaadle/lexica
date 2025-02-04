import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordMeaningPage from "./pages/WordMeaningPage";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import ProtectedRoute from "./components/ProtectedRoute";
import WordHistory from "./pages/WordHistory";
import { TestAddWordToHistoryPage } from "./pages/TestAddWordToHistory";
import ProfilePage from "./pages/ProfilePage";
import WordFeedPage from "./pages/WordFeedPage";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/meaning/:word" element={<WordMeaningPage />} /> {/* Home Page */}
          <Route path="/history" element={<WordHistory />} /> {/* Home Page */}
          <Route path="/test" element={<TestAddWordToHistoryPage />} /> {/* Home Page */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<WordFeedPage />} />
        </Route> 
      </Routes>
  );
};

export default App;
