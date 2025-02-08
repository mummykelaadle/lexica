import React from "react";
import {
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Add this line
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/QuestionsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import WordHistory from "./pages/WordHistory";
import { TestAddWordToHistoryPage } from "./pages/TestAddWordToHistory";
import ProfilePage from "./pages/ProfilePage";
import WordFeedPage from "./pages/WordFeedPage";
import { ThemeProvider } from "@/components/theme-provider"; // Make sure the path is correct
import NotFound from "./pages/NotFound"; // Add this line
import Layout from "./components/Layout";
import FavoriteWords from "./pages/FavoriteWords";


import OnboardingTest from "./pages/OnBoardingTest";
import SpaceQuestionsPage from "./pages/SpaceQuestionsPage";
import AllWord from "./pages/AllWord";
import Words from "./components/Words";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/onboarding-test" element={<OnboardingTest />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/words" element={<Words />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/revision" element={<SpaceQuestionsPage />} />
            <Route path="/history" element={<WordHistory />} />
            <Route path="/favorites" element={<FavoriteWords/>} />
            <Route path="/test" element={<TestAddWordToHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/feed/:lastCount/:bookId" element={<WordFeedPage />} />
            <Route path="/book/words/:bookId" element={<AllWord />} />

          </Route>
        </Route>
            <Route path="*" element={<NotFound />} />
      </Routes>

    </ThemeProvider>
  );
};

export default App;
