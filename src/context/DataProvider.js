import { useState, createContext } from "react";
export const DataContext = createContext();
function DataProvider(props) {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        roles,
        setRoles,
        clients,
        setClients,
        filteredClients,
        setFilteredClients,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
