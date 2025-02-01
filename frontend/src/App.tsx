import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordMeaningPage from "./pages/WordMeaningPage";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Quiz from './pages/Quiz';
import ProtectedRoute from "./components/ProtectedRoute";

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
        </Route> 
      </Routes>
  );
};

export default App;
