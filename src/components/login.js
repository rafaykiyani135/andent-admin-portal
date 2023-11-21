import usericon from "../assets/data/user-ico.png";
import passicon from "../assets/data/pass-ico.png";
import React, { useState, useEffect, useContext } from "react";
import Header from "./header";
import { Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import login from "../services/api/auth";
import { AuthContext } from "../context/AuthProvider";
import { getLoggedInUser } from "../services/api/users";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [logingIn, setLogingIn] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const { from } = location.state || { from: "/clients" };
  useEffect(() => {
    function handleWindowSizeChange() {
      setIsMobile(window.innerWidth < 1400); // Define the width to consider as mobile
    }

    // Initial check on component mount
    handleWindowSizeChange();

    // Event listener for window resize
    window.addEventListener("resize", handleWindowSizeChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Implement validation logic
    if (!username && !password) {
      toast.error("Enter email and password");
    } else if (!username) {
      toast.error("Enter email");
    } else if (!password) {
      toast.error("Enter password");
    } else {
      setLogingIn(true);
      login({ email: username, password })
        .then((res) => {
          const apiKey = res.data.data;

          getLoggedInUser(apiKey)
            .then((userRes) => {
              const userInfo = { ...userRes.data?.data, apiKey };
              localStorage.setItem(
                "andent_portal_user",
                JSON.stringify(userInfo)
              );
              setUser(userInfo);
            })
            .catch((err) => {
              toast.error("Invalid Credentials");
            })
            .finally(() => {
              setLogingIn(false);
            });
        })
        .catch((err) => {
          toast.error("Invalid Credentials");
          setLogingIn(false);
        });
    }
  };

  return user ? (
    <Navigate to={from} state={{ ...location.state }} />
  ) : (
    <div>
      <Header />
      <div className="container login-top-pad">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
        <div
          className="row login-body justify-content-center"
          style={{ width: "100%" }}
        >
          <div className="col-12 col-lg-6 col-md-6 text-center">
            <div className="login-form no-cont-offset-2">
              <h2 className="small-heading">Enter Login Credentials</h2>
              <form className="login-form" style={{ paddingTop: "80px" }}>
                <div>
                  <input
                    required
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className={`login-input ${isMobile ? "col-12" : ""}`}
                    placeholder="Enter Username"
                  />
                  <img src={usericon} alt="user-icon" className="login-icons" />
                </div>
                <div>
                  <input
                    required
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`login-input ${isMobile ? "col-12" : ""}`}
                    placeholder="Enter Password"
                  />
                  <img src={passicon} alt="pass-icon" className="login-icons" />
                </div>

                <button
                  disabled={logingIn}
                  type="submit"
                  className="login-button login-text"
                  onClick={handleLogin}
                >
                  {logingIn ? "Loging In ..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
