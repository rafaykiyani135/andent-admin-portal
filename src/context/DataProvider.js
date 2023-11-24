import { useState, createContext } from "react";
export const DataContext = createContext();
function DataProvider(props) {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [clients, setClients] = useState([]);
  const [totalClientPages, setTotalClientPages] = useState(1);
  const [clientStatuses, setClientStatuses] = useState([]);
  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        roles,
        setRoles,
        clients,
        setClients,
        totalClientPages,
        setTotalClientPages,
        clientStatuses,
        setClientStatuses,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
