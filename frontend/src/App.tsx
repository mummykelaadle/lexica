import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordMeaningPage from "./pages/WordMeaningPage";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/meaning/:word" element={<WordMeaningPage />} /> {/* Home Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
