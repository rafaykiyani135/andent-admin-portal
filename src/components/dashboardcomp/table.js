import { useState } from "react";
import invoice from "../../assets/data/invoice.png";
import del from "../../assets/data/delete.png";
import editIcon from "../../assets/data/editperm.png";
import { Link } from "react-router-dom";
import arrow from "../../assets/data/arrow.png";
import Invoice from "./invoice";
import { useRef, useEffect, useContext } from "react";
import ModifyClient from "./modifyclient";
import useData from "../../hooks/useData";
import {
  deleteClient,
  getClients,
  updateClientStatus,
} from "../../services/api/clients";
import useLogout from "../../hooks/useLogout";
import TableLoader from "../loaders/TableLoader";
import { ToastContainer, toast } from "react-toastify";
import { statuses } from "../../constants";
import EditClient from "./editClient";
import { doesUserHasPermission } from "../../services/helperFunctions";
import { AuthContext } from "../../context/AuthProvider";
function Table() {
  const { user } = useContext(AuthContext);
  const { permissions } = user.role;
  const { clients, setClients, filteredClients, setFilteredClients } =
    useData();
  const [loadingClients, setLoadingClients] = useState(false);

  const logout = useLogout();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const [newcl2, setNewcl2] = useState(false);
  const [modify, setModify] = useState([
    {
      id: "",
      source: "",
      clientName: "",
      email: "",
      number: "",
      invoice: "",
      status: "",
    },
  ]);

  const [clientData, setClientData] = useState({});
  const [clientInvoiceData, setClientInvoiceData] = useState({});
  const [isMac, setIsMac] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuRef = useRef();
  const menuRef2 = useRef();

  function fetchAllClients() {
    setLoadingClients(true);
    getClients()
      .then((res) => {
        setClients(res.data?.data);
        setFilteredClients(res.data?.data);
        setLoadingClients(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to load clients");
        setLoadingClients(false);
      });
  }

  const handleDelete = (clientId) => {
    setLoadingClients(true);
    deleteClient(clientId)
      .then((res) => {
        toast.success("Client Deleted Successfully");
        fetchAllClients();
        setLoadingClients(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to delete client");
        setLoadingClients(false);
      });
  };

  function handleEdit(client) {
    setClientData(client);
    setNewcl2(true);
  }

  useEffect(() => {
    fetchAllClients();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth > 1000 && window.innerWidth < 1500) {
      setIsMac(true);
    } else {
      setIsMac(false);
    }
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef2.current.contains(e.target)) {
        setNewcl2(false);
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
        setInvoiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleInvoiceMaker = (clientInvoiceData) => {
    setInvoiceOpen(true);
    setClientInvoiceData(clientInvoiceData);
  };

  const [dropdownStates, setDropdownStates] = useState(
    Array(clients.length).fill(false)
  );

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleStatusSelection = (userData) => {
    setLoadingClients(true);
    updateClientStatus(userData)
      .then((res) => {
        fetchAllClients();
        toast.success("Status Updated Successfully");
        setLoadingClients(false);
      })
      .catch((err) => {
        toast.error("Failed to update user status");
        setLoadingClients(false);
        if (err?.response?.status === 401) {
          logout();
        }
      });
  };

  const clickHandler = (data) => {
    setModify(data);
    setTimeout(() => {
      console.log("End of the 2-second timer");
    }, 2000);
    setNewcl2(true);
  };

  return (
    <div className="table-container">
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
              className="box-size"
              style={{ borderRadius: "4px 0px 0px 0px" }}
            >
              <h2 className="table-text-td">Sr. No</h2>
            </th>
            <th scope="col" className="box-size">
              <h2 className="table-text-td">Source</h2>
            </th>
            <th scope="col" className="box-size">
              <h2 className="table-text-td">Client Name</h2>
            </th>
            <th
              scope="col"
              className={`box-size ${
                isMobile ? `d-flex justify-content-center` : ``
              }`}
            >
              <h2 className="table-text-td">Email</h2>
            </th>
            <th scope="col" className="box-size">
              <h2 className="table-text-td">Number</h2>
            </th>
            <th scope="col" className="box-size">
              <h2 className="table-text-td">Send Invoice</h2>
            </th>
            <th scope="col" className="box-size">
              <h2 className="table-text-td">Client Status</h2>
            </th>

            {(doesUserHasPermission(permissions, "CLIENT", "UPDATE") ||
              doesUserHasPermission(permissions, "CLIENT", "DELETE")) && (
              <th
                scope="col"
                className=" box-size"
                style={{ borderRadius: "0px 4px 0px 0px" }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="position-relative">
          {loadingClients && <TableLoader />}
          {filteredClients?.map((client, index) => (
            <tr key={client?.id}>
              <td className="box-size">
                <h2 className="table-text">{index + 1}</h2>
              </td>
              <td className="box-size">
                <h2 className="table-text">{client?.source}</h2>
              </td>
              <td
                className="box-size"
                onClick={() => {
                  clickHandler(client);
                }}
              >
                <h2 className="table-text">
                  {client?.firstName} {client?.lastName}
                </h2>
              </td>
              <td className="box-size">
                <h2
                  className="table-text"
                  style={{ width: "auto", height: "auto" }}
                >
                  {client?.email}
                </h2>
              </td>
              <td className="box-size">
                <h2
                  className="table-text"
                  style={{
                    width: "auto",
                    height: "17px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {client?.number}
                </h2>
              </td>
              <td className="box-size">
                <Link
                  onClick={() => () =>
                    doesUserHasPermission(permissions, "CLIENT", "UPDATE") &&
                    handleInvoiceMaker(client)}
                >
                  <img
                    src={invoice}
                    alt="invoice-icon"
                    className="small-icon"
                  />
                </Link>
              </td>
              <td
                onClick={() =>
                  doesUserHasPermission(permissions, "CLIENT", "UPDATE") &&
                  toggleDropdown(index)
                }
                className="text-start"
                style={{ listStyleType: "none", width: isMac ? "300px" : "" }}
              >
                <div>
                  <Link style={{ textDecoration: "none", color: "#4B5768" }}>
                    <li
                      className="text-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {client?.status || "Select Status"}

                      <img
                        src={arrow}
                        alt="arrow-icon"
                        className="small-icon"
                      />
                    </li>
                  </Link>
                  <div
                    className={`dropdown-content-client-status ${
                      dropdownStates[index] ? "open" : ""
                    } justify-content-end`}
                  >
                    {statuses.map((status) => {
                      return (
                        <li
                          key={status}
                          onClick={() =>
                            handleStatusSelection({
                              ...client,
                              clientId: client.id,
                              status,
                            })
                          }
                        >
                          {status}
                        </li>
                      );
                    })}
                  </div>
                  <div
                    className={`${
                      dropdownStates[index] && !isMobile
                        ? "dropdown-overlay"
                        : ""
                    }`}
                  >
                    {
                      //Dropdown opacity logic
                    }
                  </div>
                </div>
              </td>
              {(doesUserHasPermission(permissions, "CLIENT", "UPDATE") ||
                doesUserHasPermission(permissions, "CLIENT", "DELETE")) && (
                <td className="box-size-3">
                  {doesUserHasPermission(permissions, "CLIENT", "DELETE") && (
                    <span
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(client.id);
                      }}
                    >
                      <img src={del} alt="delete-icon" className="small-icon" />
                    </span>
                  )}

                  {doesUserHasPermission(permissions, "CLIENT", "UPDATE") && (
                    <span
                      className="ms-4"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onClick={() => {
                        handleEdit({ ...client });
                      }}
                    >
                      <img
                        src={editIcon}
                        alt="edit-icon"
                        className="small-icon"
                      />
                    </span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`${invoiceOpen ? `invoice` : `d-none`}`} ref={menuRef}>
        <Invoice
          setInvoiceOpen={setInvoiceOpen}
          clientInvoiceData={clientInvoiceData}
        />
      </div>
      <div className={`${newcl2 ? `new-client-2` : `d-none`}`} ref={menuRef2}>
        <EditClient
          editClientId={clientData.id}
          clientData={clientData}
          setPopUpIsOpen={setNewcl2}
        />
      </div>
      {/* <div className={`${newcl2 ? `new-client-2` : `d-none`}`} ref={menuRef2}>
        <ModifyClient data={modify} />
      </div> */}
    </div>
  );
}

export default Table;
