import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import search from "../../assets/data/search.png";
import genlink from "../../assets/data/generatelink.png";
import addclient from "../../assets/data/addclient.png";
import Table from "./table";
import MagicLink from "./magiclink";
import GLink from "./linkgenerated";
import NewClient from "./newclient";
import useData from "../../hooks/useData";
import { createClient, getClients } from "../../services/api/clients";
import { toast } from "react-toastify";
import useLogout from "../../hooks/useLogout";
import { AuthContext } from "../../context/AuthProvider";
import { doesUserHasPermission } from "../../services/helperFunctions";
import { getAppSettings } from "../../services/api/appSettings";
import { debounce } from "lodash";
function Content() {
  const { user } = useContext(AuthContext);
  const { permissions } = user.role;
  const logout = useLogout();
  const [magicOpen, setMagicOpen] = useState(false);
  const [dataFromChild, setDataFromChild] = useState("");
  const [link, setLink] = useState(false);
  const menuRef = useRef();
  const menuRef2 = useRef();
  const menuRef3 = useRef();
  const [newcl, setNewcl] = useState(false);
  const [newClientId, setNewClientId] = useState("");
  const [searchText, setSearchText] = useState("");
  const { clients, setClients, clientStatuses, setClientStatuses } = useData();

  const debouncedResults = useMemo(() => {
    return debounce(handleClientSearch, 800);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  function handleClientSearch(e) {
    setSearchText(e.target.value?.trim());
  }

  function handleAddClient() {
    setNewcl(true);
    createClient(user.id)
      .then((res) => {
        setNewClientId(res?.data?.data?.id);
        // console.log(res?.data?.data?.id);
      })
      .catch((err) => {
        setNewcl(false);
      });
  }

  useEffect(() => {
    getAppSettings()
      .then((res) => {
        const statuses = res?.data?.data?.find(
          (objs) => objs.key === "client-statuses"
        );
        if (statuses) {
          setClientStatuses(statuses?.value?.split(","));
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(
          err?.response?.data?.message ?? "Failed to get App settings"
        );
      });
  }, []);

  useEffect(() => {
    getClients(searchText)
      .then((res) => {
        setClients(res.data?.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          logout();
        }
        toast.error(err?.response?.data?.message ?? "Failed to load clients");
      });
  }, [searchText]);

  // when new client pop is closed fetch all clients
  useEffect(() => {
    if (!newcl) {
      getClients()
        .then((res) => {
          setClients(res.data?.data);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            logout();
          }
          toast.error(err?.response?.data?.message ?? "Failed to load clients");
        });
    }
  }, [newcl]);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef3.current.contains(e.target)) {
        setLink(false);
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
        setMagicOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // this way of hiding add client modal also hides it when we try to close
  // delete file confirmation modal

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!menuRef2.current.contains(e.target)) {
  //       setNewcl(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // }, []);

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
    setMagicOpen(false);
    setLink(true);
  };

  return (
    <div
      className="d-flex justify-content-center cl-table-pos"
      style={{ width: "100vw" }}
    >
      <div className="client-content" style={{ overflowX: "hidden" }}>
        <div className="row justify-content-around align-items-center">
          <div className="col-lg-5 col-md-12 col-12 d-flex justify-content-center justify-content-md-start">
            <div className="search-bar-container">
              <input
                placeholder="Search Client Name or Number"
                className="searchbar searchbar-text"
                onChange={debouncedResults}
              />
              <div className="d-flex ">
                <div className="searchbar-des d-md-block">
                  <img
                    src={search}
                    className="small-icon search-icon"
                    alt="search-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-4 d-flex align-items-center largetext-pos-2">
            <h2 className="client-top-text">All clients</h2>
          </div>
          {doesUserHasPermission(permissions, "MAGIC", "CREATE") && (
            <div
              className="col-lg-4 col-md-6 col-12 d-flex justify-content-center justify-content-md-end mob-top-pad"
              style={{ gap: "12px" }}
            >
              <button
                className="andent-button"
                onClick={() => {
                  setMagicOpen(true);
                }}
              >
                <img src={genlink} alt="genlink icon" className="small-icon" />
                <span>
                  <h2 className="button-text">Magic Link</h2>
                </span>
              </button>
              {doesUserHasPermission(permissions, "CLIENT", "CREATE") && (
                <button className="andent-button" onClick={handleAddClient}>
                  <img
                    src={addclient}
                    alt="genlink icon"
                    className="small-icon"
                  />
                  <span>
                    <h2 className="button-text">New Client</h2>
                  </span>
                </button>
              )}
            </div>
          )}

          <div
            className={`${magicOpen ? `magiclink` : `d-none`}`}
            style={{ zIndex: "1" }}
            ref={menuRef}
          >
            <MagicLink sendDataToParent={handleDataFromChild} />
          </div>
        </div>
        {doesUserHasPermission(permissions, "CLIENT", "READ") && (
          <div className="row table-parent" style={{ paddingTop: "20px" }}>
            <Table />
          </div>
        )}

        <div className={`${link ? `gen-link` : `d-none`}`} ref={menuRef3}>
          <GLink generatedLink={dataFromChild} />
        </div>
        <div className={`${newcl ? `new-client` : `d-none`}`} ref={menuRef2}>
          <NewClient
            newClientId={newClientId}
            popUpIsOpen={newcl}
            setPopUpIsOpen={setNewcl}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
