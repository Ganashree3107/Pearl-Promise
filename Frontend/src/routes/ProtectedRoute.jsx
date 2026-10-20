import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/ui/PageLoader";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader message="Restoring your session..." />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;