import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={4}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return {};
};
