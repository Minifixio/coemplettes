import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIService} from './APIService';
import {AuthService} from './AuthService';
const carts = require('../assets/json/carts.json').carts;
const cart_items = require('../assets/json/cart_items.json').cart_items;
const users = require('../assets/json/users.json').users;

export class UserService {
  static async _userLogin(email, password, test = false) {
    // la variable 'test' signifie que l'on utilise pas la BDD mais les fichiers JSON de tests
    console.log('User login');
    if (test) {
      const user = users.find(
        val => val.email === email && val.pwdhash === password,
      );
      console.log(user);

      if (user) {
        const setUserInfosValid = await this._setUserInfos(user);
        return setUserInfosValid;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async _setUserInfos(user) {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('key', jsonUser);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async _getUserInfo() {
    try {
      const jsonUser = await AsyncStorage.getItem('@user');
      return jsonUser != null ? JSON.parse(jsonUser) : null;
    } catch (e) {
      // TODO : Ajouter une erreur dans ce cas précis
      console.log('Erreur de lecture des informations utilisateurs :', e);
      return null;
    }
  }

  static _getCurrentCart(userID) {
    const cart = carts.find(val => val.id === userID);
    const items = cart_items.filter(val => val.cart_id === cart.id);
    cart.items = items;
    return cart;
  }

  static createShipperProfile(shipperInfos) {
    return new Promise(async (resolve, reject) => {
      console.log('[UserService] Adding shipper : ', shipperInfos);
      try {
        await APIService.post('shipper', shipperInfos);
        resolve();
      } catch (e) {
        console.log("[UserService] Impossible d'ajouter l'utilisateur");
        reject(e);
      }
    });
  }

  static getShipperProfile() {
    return new Promise(async (resolve, reject) => {
      console.log('[UserService] Récupération du profile shipper');
      try {
        const userId = await AuthService.getUserId();
        const shipperProfile = await APIService.get('userId', userId);
        if (shipperProfile == null) {
          reject();
        } else {
          resolve();
        }
      } catch (e) {
        console.log('[UserService] Impossible de récupérer le profile shipper');
        reject(e);
      }
    });
  }
}
