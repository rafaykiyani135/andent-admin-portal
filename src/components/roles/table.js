import edit from "../../assets/data/editperm.png";
import EditRole from "./editrole";
import { useState } from "react";
import { useEffect, useRef } from "react";
import useData from "../../hooks/useData";
import { ToastContainer, toast } from "react-toastify";
import TableLoader from "../loaders/TableLoader";
import { getRoles } from "../../services/api/roles";
import useLogout from "../../hooks/useLogout";
function RolesTable() {
  const { roles, setRoles } = useData();
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [chRole, setChRole] = useState("");
  const menuRef = useRef();
  const logout = useLogout();
  useEffect(() => {
    setLoadingRoles(true);
    getRoles()
      .then((res) => {
        setRoles(res.data?.data);
        setLoadingRoles(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        setLoadingRoles(false);
        toast.error(err?.response?.data?.message ?? "Failed to load roles");
      });
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setEditRole(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleClick = (data) => {
    setEditRole(true);
    setChRole(data);
  };

  return (
    <div
      className="table-container"
      style={{ width: "100% !important", marginLeft: "-4px" }}
    >
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
              className=" box-size-4"
              style={{ borderRadius: "4px 0px 0px 0px" }}
            >
              Sr. No
            </th>
            <th scope="col" className=" box-size-4">
              Roles
            </th>
            <th
              scope="col"
              className=" box-size-4"
              style={{ borderRadius: "0px 4px 0px 0px" }}
            >
              Edit Permission
            </th>
          </tr>
        </thead>
        <tbody className="position-relative">
          {loadingRoles && <TableLoader />}
          {roles?.map((role, index) => (
            <tr key={role.id}>
              <td className="box-size-4">{index + 1}</td>
              <td className="box-size-4">{role.name}</td>
              <td
                className="box-size-4"
                onClick={() => {
                  handleClick(role.name);
                }}
              >
                <img src={edit} alt="edit-icon" className="small-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`${editRole ? `addrole` : `d-none`}`} ref={menuRef}>
        <EditRole role={chRole} />
      </div>
    </div>
  );
}

export default RolesTable;
