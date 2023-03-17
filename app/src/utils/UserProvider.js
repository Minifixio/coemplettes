import React, {createContext, useState, useEffect} from 'react';
import {AuthService} from '../services/AuthService';
import {APIService} from '../services/APIService';

export const UserContext = createContext();

export function UserProvider(props) {
  // le statut de login de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Affiche une page de loading si on charge des événements async
  const [isLoading, setIsLoading] = useState(true);

  // informations utilisateur
  // const [userId, setUserId] = useState(0);
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [school, setSchool] = useState('');
  // const [phone, setPhone] = useState('');
  const [userInfos, setUserInfos] = useState({});

  // informations shipper
  // const [capacity, setCapacity] = useState(0);
  // const [deliveriesCount, setDeliveriesCount] = useState(0);
  // const [priceMax, setPriceMax] = useState(0);
  // const [drive, setDrive] = useState(false);
  // const [shop, setShop] = useState(false);
  // const [hasCar, setHasCar] = useState(false);
  // const [disponibilities, setDisponibilities] = useState('');
  const [shipperInfos, setShipperInfos] = useState({});

  useEffect(() => {
    setIsLoading(true);

    const loadUser = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const userId = await AuthService.loadUser();
          await updateInfos(userId);
          resolve();
        } catch (e) {
          console.log('[UserProvider] Error while loading the user : ', e);
          reject();
        }
      });
    };

    loadUser()
      .then(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  const createShipperProfile = shipper => {
    return new Promise(async (resolve, reject) => {
      console.log('[UserProvider] Ajout du shipper : ', shipper);
      try {
        shipper.user_id = userInfos.id;
        await APIService.post('shipper', shipper);
        setShipperInfos(shipper);
        resolve();
      } catch (e) {
        console.log("[UserProvider] Impossible d'ajouter le shipper");
        reject(e);
      }
    });
  };

  const updateShipperProfile = shipper => {
    if (shipperInfos === {}) {
      return createShipperProfile();
    } else {
      return new Promise(async (resolve, reject) => {
        console.log('[UserProvider] Mise à jour du shipper : ', shipper);
        try {
          shipper.user_id = userInfos.id;
          await APIService.post('shipper', shipper);
          setShipperInfos(shipper);
          resolve();
        } catch (e) {
          console.log('[UserProvider] Impossible de mettre à jour le shipper');
          reject(e);
        }
      });
    }
  };

  /**
   * FONCTIONS D'AUTHENTIFICATION
   */
  const logout = async () => {
    await AuthService.logout();
    setIsLoggedIn(false);
  };

  const login = (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.login(email, password);
        console.log('[AuthProvider] Connexion avec succès! \n');
        await updateInfos(userId);
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
        const userId = await AuthService.register(user, password);
        console.log('[Register] Enregistrement avec succès! \n');
        await updateInfos(userId);
        setIsLoggedIn(true);
        resolve();
      } catch (e) {
        console.log('[Register] Erreur : \n', e);
        reject(e);
      }
    });

  const updateInfos = userId => {
    return new Promise(async (resolve, reject) => {
      console.log('[UserProvider] Mises à jour des infos utilisateurs');
      try {
        const user = await (await APIService.get('user', userId)).json();
        setUserInfos(user);

        try {
          const shipper = await (
            await APIService.get('shipper', userId)
          ).json();
          if (shipper !== null) {
            console.log("[UserProvider] L'utilisateur a un profil shipper");
            setShipperInfos(shipper);
          }
          resolve();
        } catch (e) {
          console.log("[UserProvider] L'utilisateur n'a pas de profil shipper");
          setShipperInfos({});
          resolve();
        }
      } catch (e) {
        console.log(
          '[UserProvider] Erreur lors de la mise à jour des infos utilisateurs',
          e,
        );
        reject();
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        login,
        logout,
        register,
        userInfos,
        shipperInfos,
        updateShipperProfile,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
