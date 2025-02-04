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
import { ThemeProvider } from "@/components/theme-provider"; // Make sure the path is correct

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/meaning/:word" element={<WordMeaningPage />} />
          <Route path="/history" element={<WordHistory />} />
          <Route path="/test" element={<TestAddWordToHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<WordFeedPage />} />
        </Route> 
      </Routes>
    </ThemeProvider>
  );
};

export default App;
