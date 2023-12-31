import adduser from "../../assets/data/add.png";
import pass from "../../assets/data/password.png";
import add from "../../assets/data/addclient.png";
import UserAccounts from "./table";
import { useState, useRef, useEffect } from "react";
import arrow from "../../assets/data/arrow.png";
import mail from "../../assets/data/mailicon.png";
import { toast } from "react-toastify";
import { getRoles } from "../../services/api/roles";
import useLogout from "../../hooks/useLogout";
import { getUsers, createUser } from "../../services/api/users";
import useData from "../../hooks/useData";
function LoginContent() {
  const [newUser, setNewUser] = useState(false);
  const [partnerDrop, setPartnerDrop] = useState(false);
  const [roleDrop, setRoleDrop] = useState(false);
  const [partner, setPartner] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [addingUser, setAddingUser] = useState(false);
  const { roles, setUsers } = useData();
  const nameRef = useRef();
  const emailRef = useRef();
  const menuRef = useRef();
  const menuRef2 = useRef();
  const menuRef3 = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const logout = useLogout();

  function handleUserCreate() {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm_password = confirmPasswordRef.current.value;
    if (!name || !email || !partner || !role || !password) {
      toast.error("Fill all the fields");
    } else if (password.length < 8) {
      toast.error("Password should have atleast 8 characters");
    } else if (password !== confirm_password) {
      toast.error("Password and confirm password are not same");
    } else {
      const payLoad = { name, email, password, roleId: selectedRoleId };
      setAddingUser(true);
      createUser(payLoad)
        .then((res) => {
          getUsers()
            .then((res) => {
              setUsers(res.data?.data);
            })
            .catch((err) => {
              if (err?.response?.status === 401) {
                logout();
              }
              toast.error(
                err?.response?.data?.message ?? "Failed to load Users"
              );
            });
          toast.success("User Created Successfully");
          setAddingUser(false);
          setNewUser(false);
        })
        .catch((err) => {
          toast.error("Failed to Create user");
          setAddingUser(false);
        });
    }
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef3.current.contains(e.target)) {
        setRoleDrop(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef2.current.contains(e.target)) {
        setPartnerDrop(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setNewUser(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handlePartner = (data) => {
    setPartner(data);
    setPartnerDrop(false);
  };

  const handleRole = (role) => {
    setSelectedRoleId(role?.id);
    setRole(role.name);
    setRoleDrop(false);
  };

  return (
    <div
      className="d-flex justify-content-center cl-table-pos"
      style={{ width: "100vw" }}
    >
      <div className="accounts-content">
        <div className="row justify-content-start align-items-center">
          <div className="col-lg-5 col-md-12 col-12 d-flex justify-content-center justify-content-md-start">
            <button
              className="andent-button-long"
              onClick={() => {
                setNewUser(true);
              }}
            >
              <h2 className="large-button-txt">Add New User</h2>
              <span className="d-flex align-items-center">
                <img src={adduser} alt="genlink icon" className="small-icon" />
              </span>
            </button>
          </div>
          <div className="col-lg-5 col-md-6 col-12 d-flex align-items-center largetext-pos justify-content-center justify-content-md-start">
            <h2 className="accounts-top-text">User Accounts</h2>
          </div>
        </div>
        <div className={`${newUser ? `newuser` : `d-none`}`} ref={menuRef}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-12 col-12">
              <h2 className="popup-heading">User</h2>
            </div>
          </div>
          <div className="row justify-content-start" style={{ width: "100%" }}>
            <div className="col-12 col-lg-6 text-start">
              <div>
                <h2 className="popup-heading-2 text-start">User Name</h2>
                <input
                  className="popup-inputs-small"
                  placeholder="Enter username"
                  ref={nameRef}
                />
              </div>
              <div style={{ marginTop: "8px" }}>
                <h2 className="popup-heading-2 text-start">Partner Name</h2>
                <div
                  className="popup-inputs-small-dropdown"
                  onClick={() => {
                    setPartnerDrop(!partnerDrop);
                  }}
                >
                  {partner ? partner : "Select Partner Name"}
                  <img
                    src={arrow}
                    alt="arrow-icon"
                    className="small-icon arrow-pos"
                  />
                </div>
                <div
                  className={`dropdown-partner ${
                    partnerDrop ? "open" : ""
                  } justify-content-end`}
                  ref={menuRef2}
                >
                  <li
                    style={{ listStyleType: "none" }}
                    onClick={() => {
                      handlePartner("Andent");
                    }}
                  >
                    Andent
                  </li>
                  <li
                    style={{ listStyleType: "none" }}
                    onClick={() => {
                      handlePartner("Italian Agency");
                    }}
                  >
                    Italian Agency
                  </li>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 text-start mob-top-pad">
              <div className="">
                <h2 className="popup-heading-2 text-start">Email</h2>
                <div className="d-flex align-items-center">
                  <input
                    className="popup-inputs-small"
                    placeholder="Enter Email"
                    ref={emailRef}
                  />
                  <img
                    src={mail}
                    alt="arrow-icon"
                    className="small-icon"
                    style={{ position: "absolute", right: "40px" }}
                  />
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <h2 className="popup-heading-2 text-start">User Role</h2>
                <div
                  className="popup-inputs-small-dropdown"
                  onClick={() => {
                    setRoleDrop(!roleDrop);
                  }}
                >
                  {role ? role : "Select User role"}
                  <img
                    src={arrow}
                    alt="arrow-icon"
                    className="small-icon"
                    style={{ position: "absolute", right: "40px" }}
                  />
                </div>
                <div
                  className={`dropdown-partner ${
                    roleDrop ? "open" : ""
                  } justify-content-end`}
                  ref={menuRef3}
                >
                  {roles?.map((role) => {
                    return (
                      <li
                        key={role?.id}
                        style={{ listStyleType: "none" }}
                        onClick={() => {
                          handleRole({ ...role });
                        }}
                      >
                        {role?.name}
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-start" style={{ width: "100%" }}>
            <div className="col-12 col-lg-12 text-start d-flex align-items-center">
              <h2 className="popup-heading-2 text-start">New Password</h2>
            </div>
            <div className="col-lg-12 col-12 text-start d-flex align-items-center">
              <input
                className="popup-inputs d-flex align-items-center"
                placeholder="Enter Password"
                ref={passwordRef}
              />
              <img
                src={pass}
                alt="arrow-icon"
                className="small-icon"
                style={{ position: "absolute", right: "40px" }}
              />
            </div>
          </div>
          <div className="row justify-content-start" style={{ width: "100%" }}>
            <div className="col-12 col-lg-12 text-start">
              <h2 className="popup-heading-2 text-start">Confirm Password</h2>
            </div>
            <div className="col-lg-12 col-12 text-start d-flex align-items-center">
              <input
                className="popup-inputs d-flex align-items-center"
                placeholder="Re-Enter Password"
                ref={confirmPasswordRef}
              />
              <img
                src={pass}
                alt="arrow-icon"
                className="small-icon"
                style={{ position: "absolute", right: "40px" }}
              />
            </div>
          </div>
          <div
            className="row justify-content-start d-flex"
            style={{ width: "100%" }}
          >
            <div
              className="col-12 col-lg-12 text-start d-flex justify-content-center"
              style={{ gap: "24px" }}
            >
              <button
                disabled={addingUser}
                className="andent-button"
                onClick={handleUserCreate}
              >
                <h2 className="button-text">
                  {addingUser ? "Adding User ..." : "Add User"}
                  <span
                    style={{
                      marginLeft: "8px",
                      bottom: "2px",
                      position: "relative",
                    }}
                  >
                    <img src={add} alt="genlink icon" className="small-icon" />
                  </span>
                </h2>
              </button>
            </div>
          </div>
        </div>
        <div className="useraccounts-table row">
          <UserAccounts />
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
