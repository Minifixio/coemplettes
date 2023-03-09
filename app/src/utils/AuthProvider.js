import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
  // le statut de login de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {};
  const logout = () => {};
  const register = () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        register,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
