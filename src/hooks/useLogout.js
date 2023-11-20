import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { clearStorage } from "../services/localStorage";
function useLogout() {
  const { user, setUser } = useContext(AuthContext);
  function logout() {
    setUser(null);
    clearStorage();
  }
  return logout;
}

export default useLogout;
