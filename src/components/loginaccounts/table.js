import { Link } from "react-router-dom";
import { useState } from "react";
import arrow from "../../assets/data/arrow.png";
import del from "../../assets/data/delete.png";
import { useEffect } from "react";
import { deleteUser, getUsers, updateUserRole } from "../../services/api/users";
import { getRoles } from "../../services/api/roles";
import { ToastContainer, toast } from "react-toastify";
import useLogout from "../../hooks/useLogout";
import TableLoader from "../loaders/TableLoader";
function UserAccounts(props) {
  const [roles, setRoles] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);
  const logout = useLogout();

  function fetchAllUsers() {
    getUsers()
      .then((res) => {
        setTableData(res.data?.data);
        setLoadingUsers(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to load Users");
        setLoadingUsers(false);
      });
  }

  useEffect(() => {
    setLoadingUsers(true);
    getRoles()
      .then((res) => {
        setRoles(res.data?.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to load roles");
      });
    fetchAllUsers();
  }, [props.newUserAdded]);

  const [dropdownStates, setDropdownStates] = useState(
    Array(tableData.length).fill(false)
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleStatusSelection = (userInfo) => {
    console.log(userInfo);
    setUpdatingRole(true);
    updateUserRole(userInfo)
      .then((res) => {
        fetchAllUsers();
        setUpdatingRole(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(
          err?.response?.data?.message ?? "Failed to update User role"
        );
        setUpdatingRole(false);
      });
  };

  const handleDelete = (userId) => {
    setUpdatingRole(true);
    deleteUser(userId)
      .then((res) => {
        toast.success("User Deleted Successfully");
        fetchAllUsers();
        setUpdatingRole(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to delete User");
        setUpdatingRole(false);
      });
  };

  return (
    <div className="table-container" style={{ marginLeft: "-4px" }}>
      <ToastContainer
        hideProgressBar={true}
        position="top-right"
        autoClose={3000}
      />
      <table className="andent-table">
        <thead>
          <tr>
            <th
              scope="col"
              className=" box-size-2"
              style={{ borderRadius: "4px 0px 0px 0px" }}
            >
              Sr. No
            </th>
            <th scope="col" className=" box-size-3">
              User Name
            </th>
            <th scope="col" className=" box-size-3">
              User Email
            </th>
            <th scope="col" className=" box-size-3">
              User role
            </th>
            <th
              scope="col"
              className=" box-size-3"
              style={{ borderRadius: "0px 4px 0px 0px" }}
            >
              Delete User
            </th>
          </tr>
        </thead>

        <tbody className="position-relative">
          {(loadingUsers || updatingRole) && <TableLoader />}
          {tableData?.map((row, index) => (
            <tr key={row?.id}>
              <td className="box-size-2">{index + 1}</td>
              <td className="box-size-3">{row?.name}</td>
              <td className="box-size-3">{row?.email}</td>
              <td
                onClick={() => toggleDropdown(index)}
                className="text-start"
                style={{ listStyleType: "none" }}
              >
                <Link style={{ textDecoration: "none", color: "#4B5768" }}>
                  <li className="text-center update-status">
                    {row?.role?.name}{" "}
                    <img src={arrow} alt="arrow-icon" className="small-icon" />
                  </li>
                </Link>
                <Link style={{ textDecoration: "none", color: "#4B5768" }}>
                  <div
                    className={`dropdown-content-accounts ${
                      dropdownStates[index] ? "open" : ""
                    } justify-content-end`}
                  >
                    {roles?.map((role) => {
                      return (
                        <li
                          key={role?.id}
                          onClick={() => {
                            handleStatusSelection({
                              roleId: role?.id,
                              userId: row?.id,
                              name: row?.name,
                              email: row?.email,
                              password: row?.password,
                            });
                          }}
                        >
                          {role?.name}
                        </li>
                      );
                    })}
                  </div>
                </Link>
                <div
                  className={`${
                    dropdownStates[index] && !isMobile ? "dropdown-overlay" : ""
                  }`}
                ></div>
              </td>
              <td className="box-size-3">
                <span
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  <img src={del} alt="delete-icon" className="small-icon" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAccounts;
