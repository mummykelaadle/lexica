import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
