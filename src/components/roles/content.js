import { useState, useContext } from "react";
import add from "../../assets/data/add.png";
import RolesTable from "./table";
import AddRole from "./addrole";
import { useRef, useEffect } from "react";
import { getPermissions } from "../../services/api/roles";
import useLogout from "../../hooks/useLogout";
import { doesUserHasPermission } from "../../services/helperFunctions";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
function RolesContent() {
  const [permissions, setPermissions] = useState([]);
  const [addRole, setAddRole] = useState(false);
  const { user } = useContext(AuthContext);
  const menuRef = useRef();
  const logout = useLogout();
  useEffect(() => {
    getPermissions()
      .then((res) => {
        setPermissions(res?.data?.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(
          err?.response?.data?.message ?? "Failed to load permissions"
        );
      });
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setAddRole(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="d-flex justify-content-center cl-table-pos"
    style={{ width: "100vw" }}>
      <div className="roles-content">
        <div className="row justify-content-start align-items-center">
          <div className="col-lg-5 col-md-12 col-12 d-flex justify-content-center justify-content-md-start">
            {doesUserHasPermission(user.role.permissions, "ROLE", "CREATE") && (
              <button
                className="andent-button-long"
                onClick={() => {
                  setAddRole(true);
                }}
              >
                <h2 className="large-button-txt">Add New Role</h2>
                <span className="d-flex align-items-center">
                  <img src={add} alt="genlink icon" className="small-icon" />
                </span>
              </button>
            )}
          </div>
          <div className="col-lg-5 col-md-12 col-12 d-flex align-items-center justify-content-center justify-content-md-start largetext-pos">
            <h2 className="accounts-top-text">Roles</h2>
          </div>
        </div>
        {doesUserHasPermission(user.role.permissions, "ROLE", "READ") && (
          <div style={{ width: "100%" }}>
            <RolesTable isAddRoleOpen={addRole} />
          </div>
        )}

        {addRole && (
          <div className={`${addRole ? `addrole` : `d-none`}`} ref={menuRef}>
            <AddRole setAddRole={setAddRole} permissions={permissions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RolesContent;
