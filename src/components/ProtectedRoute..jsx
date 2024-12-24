import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("aToken");
  return token ? children : <Navigate to="/signup" replace />;
}
