import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
export default function ProtectedRoutes({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return !user ? (
    <Navigate
      to="/"
      replace
      state={{ from: location.pathname, ...location.state }}
    />
  ) : (
    children
  );
}
