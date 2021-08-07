import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return {
    user,
    setUser,
  };
};
