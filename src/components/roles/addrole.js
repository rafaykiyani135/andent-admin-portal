import { useState, useRef } from "react";
import plus from "../../assets/data/add.png";
import { toast } from "react-toastify";
import { addRole } from "../../services/api/roles";

function AddRole(props) {
  const allPermissions = props.permissions;
  const { setAddRole } = props;
  const allCategories = [];
  var selectedPermissions = [];
  const nameRef = useRef();
  const userPermissions = allPermissions.filter((permission) => {
    return permission.name === "USER";
  });
  const clientPermissions = allPermissions.filter((permission) => {
    return permission.name === "CLIENT";
  });
  const rolePermissions = allPermissions.filter((permission) => {
    return permission.name === "ROLE";
  });

  console.log(rolePermissions);

  allPermissions.forEach((permission) => {
    if (permission.name === "USER") {
      if (!containsProperty(allCategories, "User")) {
        allCategories.push({
          label: "User",
          permissions: userPermissions?.sort((a, b) =>
            a.type.localeCompare(b.type)
          ),
        });
      }
    } else if (permission.name === "CLIENT") {
      if (!containsProperty(allCategories, "Client")) {
        allCategories.push({
          label: "Client",
          permissions: clientPermissions?.sort((a, b) =>
            a.type.localeCompare(b.type)
          ),
        });
      }
    } else if (permission.name === "ROLE") {
      if (!containsProperty(allCategories, "Roles")) {
        allCategories.push({
          label: "Roles",
          permissions: rolePermissions?.sort((a, b) =>
            a.type.localeCompare(b.type)
          ),
        });
      }
    }
  });

  // Function to check if an object with the specified property already exists in the array
  function containsProperty(array, propertyName) {
    return array.some((obj) => obj?.label === propertyName);
  }

  function handlePermissionChange(e, permissionId) {
    if (e.target.checked && !selectedPermissions.includes()) {
      selectedPermissions.push(permissionId);
    } else if (
      !e.target.checked &&
      selectedPermissions.includes(permissionId)
    ) {
      selectedPermissions = selectedPermissions.filter(
        (permission) => permission !== permissionId
      );
    }
  }

  function handleAddRole() {
    if (!nameRef.current?.value) {
      toast.error("Enter role name");
      return;
    }
    if (selectedPermissions.length === 0) {
      toast.error("Select atleast one permission");
      return;
    }
    const payLoad = {
      name: nameRef.current?.value?.trim(),
      permissions: selectedPermissions.map((permission) => {
        return {
          id: permission,
        };
      }),
    };
    addRole(payLoad)
      .then((res) => {
        toast.success("New Role Added");
        setAddRole(false);
      })
      .catch((err) => {
        toast.err(err?.response?.data?.message || "Failed to add new role");
      });
  }

  return (
    <>
      <div
        className="row justify-content-center text-start"
        style={{ width: "100%" }}
      >
        <div className="col-lg-6 col-12 text-start">
          <h2 className="popup-heading-2 text-center text-md-start">
            Role Name
          </h2>
        </div>
      </div>
      <div
        className="row justify-content-center text-start"
        style={{ width: "100%" }}
      >
        <div className="col-lg-6 col-12 text-start">
          <div>
            <input
              className="popup-inputs-small"
              placeholder="Enter Role Name"
              ref={nameRef}
            />
          </div>
        </div>
      </div>

      <div
        className="row justify-content-center text-center"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <div className="col-lg-12 col-12 text-center">
          <h2 className="popup-heading-4">Permisions / Admin</h2>
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
          <button onClick={handleAddRole} className="andent-button-perm">
            <h2 className="button-text">
              Create Role
              <span
                style={{
                  marginLeft: "8px",
                  bottom: "2px",
                  position: "relative",
                }}
              >
                <img src={plus} alt="genlink icon" className="small-icon" />
              </span>
            </h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddRole;
