import React, {createContext, useState, useEffect} from 'react';
import {AuthService} from '../services/AuthService';

export const AuthContext = createContext();

export function AuthProvider(props) {
  // le statut de login de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Affiche une page de loading si on charge des événements async
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    AuthService.loadUser()
      .then(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  const logout = async () => {
    await AuthService.logout();
    setIsLoggedIn(false);
  };

  const login = (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        await AuthService.login(email, password);
        console.log('[AuthProvider] Connexion avec succès! \n');
        setIsLoggedIn(true);
        resolve();
      } catch (e) {
        console.log('[AuthProvider] Erreur de connexion : \n', e);
        reject(e);
      }
    });

  const register = async (user, password) =>
    new Promise(async (resolve, reject) => {
      try {
        await AuthService.register(user, password);
        console.log('[Register] Enregistrement avec succès! \n');
        setIsLoggedIn(true);
        resolve();
      } catch (e) {
        console.log('[Register] Erreur : \n', e);
        reject(e);
      }
    });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        login,
        logout,
        register,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
