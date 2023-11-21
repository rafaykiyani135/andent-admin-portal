import Login from "../components/login";
import Dashboard from "../components/dashboard";
import { Routes, Route } from "react-router-dom";
import "../assets/style.css";
import "../assets/responsive.css";
import "../index.css";
import LoggedIn from "../components/loginaccounts/dashboard";
import Roles from "../components/roles/dashboard";
import BookApt from "../components/magiclink/magicLink";
import ProtectedRoutes from "./ProtectedRoutes";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/clients"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoutes>
              <LoggedIn />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoutes>
              <Roles />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoutes>
              <BookApt />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default Router;
