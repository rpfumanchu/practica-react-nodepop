import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

//NOTE custom hook
export const useAuth = () => {
  const authValue = useContext(AuthContext);
  return authValue;
};

export const AuthContextProvider = ({ isInitiallyLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged, // isLogged: isLogged
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
