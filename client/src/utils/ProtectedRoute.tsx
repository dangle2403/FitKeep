import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../lib/auth-client";
import { Spinner } from "../components/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, isPending, error } = useSession();
  const location = useLocation();

  // Show loading spinner while checking session
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={48} color="#FF6A00" />
      </div>
    );
  }

  // If there's an error or no session, redirect to signin
  if (error || !session) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
