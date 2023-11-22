import { createContext, useState } from "react";
export const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("andent_portal_user"))
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
