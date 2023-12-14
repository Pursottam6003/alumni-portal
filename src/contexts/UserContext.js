import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { checkAuth, loading, login, user, admin, logout } = useAuth();

  return (
    <UserContext.Provider value={{ loading, user, admin, login, logout, checkAuth }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);
export default UserProvider;