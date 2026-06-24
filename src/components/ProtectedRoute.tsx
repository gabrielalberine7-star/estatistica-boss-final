import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="page-section center-section">
        <div className="loading-card">Carregando sua ficha de aventura...</div>
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
