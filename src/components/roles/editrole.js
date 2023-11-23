import { useState, useRef, useEffect } from "react";
import save from "../../assets/data/save.png";
import { toast } from "react-toastify";
import { getRoles, updateRole } from "../../services/api/roles";
import useData from "../../hooks/useData";
function EditRole(props) {
  const { allPermissions, roleData, setIsEditOpen } = props;
  const [updatingRole, setUpdatingRole] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const { roles, setRoles } = useData();
  const [selectedPermissions, setSelectedPermissions] = useState(
    roleData?.permissions?.map((permission) => permission.id)
  );
  const nameRef = useRef();

  useEffect(() => {
    const userPermissions = allPermissions.filter((permission) => {
      return permission.name === "USER";
    });
    const clientPermissions = allPermissions.filter((permission) => {
      return permission.name === "CLIENT";
    });
    const rolePermissions = allPermissions.filter((permission) => {
      return permission.name === "ROLE";
    });
    setAllCategories([
      {
        label: "Roles",
        permissions: rolePermissions?.sort((a, b) =>
          a.type.localeCompare(b.type)
        ),
      },
      {
        label: "User",
        permissions: userPermissions?.sort((a, b) =>
          a.type.localeCompare(b.type)
        ),
      },
      {
        label: "Client",
        permissions: clientPermissions?.sort((a, b) =>
          a.type.localeCompare(b.type)
        ),
      },
    ]);
  }, []);

  function handlePermissionChange(e, permissionId) {
    if (e.target.checked && !selectedPermissions.includes()) {
      setSelectedPermissions((prevPermissions) => [
        ...prevPermissions,
        permissionId,
      ]);
    } else if (
      !e.target.checked &&
      selectedPermissions.includes(permissionId)
    ) {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== permissionId)
      );
    }
  }

  function handleUpdateRole() {
    if (selectedPermissions.length === 0) {
      toast.error("Select atleast one permission");
      return;
    }

    const payLoad = {
      id: roleData.id,
      name: roleData.name,
      permissions: selectedPermissions.map((permission) => {
        return {
          id: permission,
        };
      }),
    };

    setUpdatingRole(true);
    updateRole(payLoad)
      .then((res) => {
        toast.success("Role updated successfully");
        setUpdatingRole(false);
        setIsEditOpen(false);
        getRoles()
          .then((res) => {
            setRoles(res?.data?.data);
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message ?? "Failed to get roles");
          });
      })
      .catch((err) => {
        toast.err(err?.response?.data?.message ?? "Failed to update role");
        setUpdatingRole(false);
      });
  }

  return (
    <>
      <div
        className="row justify-content-center text-center"
        style={{ width: "100%" }}
      >
        <div className="col-lg-12 col-12 text-center">
          <h2 className="popup-heading-4">Permisions / {roleData.name}</h2>
        </div>
      </div>
      <div className="perm-table-mob" style={{ width: "100%" }}>
        <div className="perm-table">
          <table>
            <thead>
              <tr>
                <th className="namefield">Name Fields</th>
                <th
                  colSpan={4}
                  style={{ textAlign: "center" }}
                  className="selectperm"
                >
                  Select Permissions
                </th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((category) => (
                <tr key={category?.label}>
                  <td className="categories-box permission-text-2">
                    {category?.label}
                  </td>
                  {category?.permissions?.map((permission) => (
                    <td key={permission?.id} className="perm-box">
                      <div className="d-flex align-items-center justify-content-around text-start">
                        <p className="permission-text">{permission?.type}</p>
                        <span>
                          <input
                            checked={selectedPermissions.includes(
                              permission?.id
                            )}
                            type="checkbox"
                            onChange={(e) =>
                              handlePermissionChange(e, permission?.id)
                            }
                          />
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="row justify-content-start d-flex"
        style={{ width: "100%", marginTop: "12px" }}
      >
        <div
          className="col-12 col-lg-12 text-start d-flex justify-content-center"
          style={{ gap: "24px" }}
        >
          <button
            onClick={handleUpdateRole}
            disabled={updatingRole}
            className="andent-button-perm"
          >
            <h2 className="button-text">
              {updatingRole ? "Saving ..." : "Save Changes"}
              <span
                style={{
                  marginLeft: "8px",
                  bottom: "2px",
                  position: "relative",
                }}
              >
                <img src={save} alt="genlink icon" className="small-icon" />
              </span>
            </h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default EditRole;
