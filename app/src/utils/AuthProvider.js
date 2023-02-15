import React, {createContext, useState} from 'react';
export const AuthContext = createContext();

export function AuthProvider(props) {
  // le statut de login de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
