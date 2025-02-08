import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "@/animations/Spinner";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    const fetchScore = async () => {
      if (isSignedIn) {
        try {
          const res = await axios.get(`${baseUrl}/api/v1/user/onBoardingTestScore`, { withCredentials: true });
          setScore(res.data.score);
        } catch (error) {
          console.error("Error fetching score", error);
        }
      }
    };
    fetchScore();
  }, [isSignedIn]);

  if (loading) {
    return <Spinner />;
  }

  if (isSignedIn) {
    // Redirect to onboarding test until the score is set
    if (score === null && location.pathname !== "/onboarding-test") {
      return <Navigate to="/onboarding-test" replace />;
    }
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;

