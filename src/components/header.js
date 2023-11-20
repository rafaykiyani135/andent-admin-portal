import logo from "../assets/data/logo.png";
import logoutIcon from "../assets/data/logout.png";
import save from "../assets/data/save.png";
import { useState, useEffect, useContext } from "react";
import arrow from "../assets/data/arrow.png";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import passicon from "../assets/data/password.png";
import logosmall from "../assets/data/logosmall.png";
import dd from "../assets/data/burgerhd.svg";
import icon1 from "../assets/data/loginaccs.png";
import icon2 from "../assets/data/allclients.png";
import icon3 from "../assets/data/roles.png";
import icon1active from "../assets/data/loginaccsactive.png";
import icon2active from "../assets/data/allclientsactive.png";
import icon3active from "../assets/data/rolesactive.png";
import { useLocation } from "react-router-dom";
import user from "../assets/data/user2.svg";
import { AuthContext } from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";
function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  // const [path,setPath] = useState("")
  const menuRef = useRef();
  const menuRef2 = useRef();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const { user } = useContext(AuthContext);
  const logout = useLogout();
  useEffect(() => {
    setPath(location.pathname);
  }, [setPath, location]);

  function handleLogout() {
    logout();
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef2.current.contains(e.target)) {
        setIsSettingOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setIsSettingOpen]);

  // useEffect(()=>{
  //     setPath(window.location.pathname);
  // },[])

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    function handleWindowSizeChange() {
      setIsMobile(window.innerWidth < 600); // Define the width to consider as mobile
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

  return (
    <>
      <div className="login-top justify-content-start header-size">
        <div className="col-5 d-block d-md-none">
          <div className="burger-icon" onClick={toggleDropdown}>
            <img src={dd} alt="dropdown-icon" className="dropdown-icon" />
          </div>
          {isDropdownVisible && (
            <div className="dropdown-content-navbar open">
              <NavLink
                to="/accounts"
                style={{ textDecoration: "none", color: "#4B5768" }}
                className="d-flex justify-content-start align-items-center"
              >
                <img
                  src={path === "/accounts" ? icon1active : icon1}
                  alt="logged in accounts"
                  className="small-icon"
                />
                <span>
                  <h2 className="sidebar-text">Login Accounts</h2>
                </span>
              </NavLink>
              <NavLink
                to="/clients"
                style={{ textDecoration: "none" }}
                className="d-flex justify-content-start align-items-center text-start"
              >
                <img
                  src={path === "/clients" ? icon2active : icon2}
                  alt="all clients"
                  className="small-icon"
                />
                <span>
                  <h2 className="sidebar-text" style={{ marginTop: "6px" }}>
                    All Client
                  </h2>
                </span>
              </NavLink>
              <NavLink
                to="/roles"
                style={{ textDecoration: "none" }}
                className="d-flex justify-content-start align-items-center"
              >
                <img
                  src={path === "/roles" ? icon3active : icon3}
                  alt="roles"
                  className="small-icon"
                />
                <span>
                  <h2 className="sidebar-text">Roles</h2>
                </span>
              </NavLink>
            </div>
          )}
        </div>
        <div className="col-1 col-lg-5">
          <img
            src={window.innerWidth < 700 ? logosmall : logo}
            alt="andent logo"
            className={`${isMobile ? "andent-logo-small" : "andent-logo"}`}
          />
        </div>
        <div
          className="col-lg-2 text-start d-none d-lg-block no-cont-offset3 text-center text-md-start"
          style={{ width: "auto" }}
        >
          <h1 className="login-top-text">Andent Portal</h1>
        </div>
        <div className="col-6 col-lg-3 d-flex justify-content-end justify-content-md-end align-items-center header-user">
          {
            //logged in user/employee should be shown here
            //implement logic when api is integrated
          }
          <Link style={{ position: "absolute", marginTop: "12px" }}>
            <ul
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="header-user-textbox"
              ref={menuRef}
              style={{ listStyleType: "none" }}
            >
              <li className="text-center">
                {!isMobile ? (
                  `${user?.name} (${user?.role?.name?.toLowerCase()})`
                ) : (
                  <img
                    src={user}
                    alt="user icon"
                    style={{ width: "35px", height: "35px" }}
                  />
                )}
                <span style={{ marginLeft: "5px" }}>
                  <img src={arrow} className="small-icon" alt="arrow icon" />
                </span>
              </li>
              <div
                className={`dropdown-content ${
                  isOpen ? "open" : ""
                } justify-content-end`}
              >
                <p
                  onClick={() => {
                    setIsSettingOpen(true);
                  }}
                >
                  Settings
                </p>
                <span
                  onClick={handleLogout}
                  to="/"
                  style={{
                    marginTop: "-10px",
                    textDecoration: "none",
                    color: "#4B5768",
                  }}
                >
                  Logout
                  <span>
                    <img
                      src={logoutIcon}
                      alt="logout icon"
                      className="small-icon"
                      style={{ position: "absolute", right: "12px" }}
                    />
                  </span>
                </span>
              </div>
            </ul>
          </Link>
          <div className={`${isOpen ? "dropdown-overlay" : ""}`}>
            {
              //Dropdown opacity logic
            }
          </div>
          <div
            className={`${isSettingOpen ? "setting-popup" : "d-none"}`}
            ref={menuRef2}
          >
            <div className="row justify-content-center text-center">
              <div className="col-lg-12 col-12">
                <h2 className="popup-heading">User</h2>
              </div>
            </div>
            <div
              className="row justify-content-start"
              style={{ width: "100%" }}
            >
              <div className="col-12 col-lg-12 text-start">
                <h2 className="popup-heading-2 text-start">Username</h2>
              </div>
              <div className="col-lg-12 col-12 text-start">
                <input className="popup-inputs" placeholder="Enter username" />
              </div>
            </div>
            <div
              className="row justify-content-start"
              style={{ width: "100%" }}
            >
              <div className="col-12 col-lg-12 text-start">
                <h2 className="popup-heading-2 text-start">Old Password</h2>
              </div>
              <div className="col-lg-12 col-12 text-start">
                <div className="d-flex align-items-center">
                  <input
                    className="popup-inputs"
                    placeholder="Enter Password"
                  />
                  <img
                    src={passicon}
                    alt="password-icon"
                    className="small-icon"
                    style={{ position: "absolute", right: "40px" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-start"
              style={{ width: "100%" }}
            >
              <div className="col-12 col-lg-12 text-start">
                <h2 className="popup-heading-2 text-start">New Password</h2>
              </div>
              <div className="col-lg-12 col-12 text-start">
                <div className="d-flex align-items-center">
                  <input
                    className="popup-inputs"
                    placeholder="Enter Password"
                  />
                  <img
                    src={passicon}
                    alt="password-icon"
                    className="small-icon"
                    style={{ position: "absolute", right: "40px" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-start"
              style={{ width: "100%" }}
            >
              <div className="col-12 col-lg-12 text-start">
                <h2 className="popup-heading-2 text-start">Confirm Password</h2>
              </div>
              <div className="col-lg-12 col-12 text-start">
                <div className="d-flex align-items-center">
                  <input
                    className="popup-inputs"
                    placeholder="Re-Enter Password"
                  />
                  <img
                    src={passicon}
                    alt="password-icon"
                    className="small-icon"
                    style={{ position: "absolute", right: "40px" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="row justify-content-center"
              style={{ width: "100%" }}
            >
              <div className="col-12 col-lg-12 text-start d-flex justify-content-center align-items-center">
                <button
                  className="andent-button"
                  onClick={() => {
                    setIsSettingOpen(false);
                  }}
                >
                  <h2 className="button-text">Save Changes</h2>
                  <span className="d-flex align-items-center">
                    <img src={save} alt="genlink icon" className="small-icon" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
