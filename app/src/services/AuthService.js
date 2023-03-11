import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIService} from './APIService';

/**
 * Ce que l'on stocke en mémoire locale sur l'appreil :
 * - les tokens (refresh & access)
 *  - key : @token / objet {access_token, refresh_token}
 * - l'id, l'email, le nom, le prénom de l'utilisateur
 *  - key : @user_infos / objet {user_id, email}
 */

export class AuthService {
  static async register(user, password) {
    console.log('[Auth] Enregistrement du user : \n', user);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await APIService.post('register', {user, password}, false);

        if (res.status === 401) {
          const msg = await res.json();
          console.log(
            "[Auth] L'enregistrement a échoué (unauthorized): \n",
            msg,
          );
          reject(msg);
        }

        if (!res.ok) {
          const msg = await res.json();
          console.log("[Auth] L'enregistrement a échoué : \n", msg);
          reject(msg);
        }

        const resJSON = await res.json();
        const userId = resJSON.user_id;
        const tokens = resJSON.tokens;
        console.log('[Auth] Enregistrement correct, tokens : \n', tokens);

        await this.storeTokens(tokens);
        await this.storeUserInfos(userId, user.email);

        resolve();
      } catch (e) {
        console.log("[Auth] L'enregistrement a échoué : \n", e);
        reject(e);
      }
    });
  }

  static async login(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('[Auth] Phase de login');
        const res = await APIService.post('login', {email, password}, false);

        if (res.status === 401) {
          const msg = await res.json();
          console.log('[Auth] La connexion a échouée (unauthorized): \n', msg);
          reject(msg);
        }
        if (!res.ok) {
          const msg = await res.json();
          console.log('[Auth] La connexion a échouée : \n', msg);
          reject(msg);
        }

        const resJSON = await res.json();
        console.log('[Auth] Résultat de la connexion : \n', resJSON);
        const userId = resJSON.user_id;
        const tokens = resJSON.tokens;

        await this.storeTokens(tokens);
        await this.storeUserInfos(userId, email);
        resolve();
      } catch (e) {
        console.log('[Auth] La connexion a échouée : \n', e);
        reject(e);
      }
    });
  }

  static async refreshAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const tokensJSON = await AsyncStorage.getItem('@tokens');
        const tokens = JSON.parse(tokensJSON);

        const userInfosJSON = await AsyncStorage.getItem('@user_infos');
        const userInfos = JSON.parse(userInfosJSON);

        console.log('[Auth] Refresh des tokens : ', userInfos, tokens);

        const res = await APIService.post(
          'refresh',
          {
            email: userInfos.email,
            refresh_token: tokens.refresh_token,
          },
          false,
        );

        if (res.status === 401) {
          const msg = await res.json();
          console.log('[Auth] Le refresh a échoué (unauthorized): \n', msg);
          reject(msg);
        }
        if (!res.ok) {
          const msg = await res.json();
          console.log('[Auth] Le refresh a échoué : \n', msg);
          reject(msg);
        }

        const newTokens = await res.json();
        await this.storeTokens(newTokens);
        resolve();
      } catch (e) {
        console.log('[Auth] Le refresh a échoué : \n', e);
        reject(e);
      }
    });
  }

  static async storeTokens(tokens) {
    console.log('[Auth] Stockage de nouveaux tokens');
    try {
      const tokensJSON = JSON.stringify({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });
      await AsyncStorage.setItem('@tokens', tokensJSON);
    } catch (e) {
      console.log('[Auth] Impossible de stocker les nouveaux tokens : \n', e);
    }
  }

  static async storeUserInfos(userId, email) {
    console.log('[Auth] Stockage des informations utilisateur');
    try {
      const userJSON = JSON.stringify({
        user_id: userId,
        email,
      });
      await AsyncStorage.setItem('@user_infos', userJSON);
    } catch (e) {
      console.log(
        '[Auth] Impossible de stocker les informations utilisateur : \n',
        e,
      );
    }
  }

  static async getAccessToken() {
    try {
      const tokensJSON = await AsyncStorage.getItem('@tokens');
      const tokens = JSON.parse(tokensJSON);
      console.log(
        '[Auth] Accès au access token depuis le local storage : ',
        tokens.access_token,
      );
      return tokens.access_token;
    } catch (e) {
      console.log(
        '[Auth] Impossible de récupérer les tokens depuis le local storage : \n',
        e,
      );
    }
  }

  static async getUserId() {
    try {
      console.log('[Auth] Accès au user_id depuis le local storage...');
      const userInfosJSON = await AsyncStorage.getItem('@user_infos');
      const userInfos = JSON.parse(userInfosJSON);
      return userInfos.user_id;
    } catch (e) {
      console.log(
        '[Auth] Impossible de récupérer le user_id depuis le local storage : \n',
        e,
      );
    }
  }

  static async loadUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfosJSON = await AsyncStorage.getItem('@user_infos');

        if (userInfosJSON == null || JSON.parse(userInfosJSON) === {}) {
          reject();
        } else {
          await this.refreshAuth();
          resolve();
        }
      } catch (e) {
        reject();
      }
    });
  }

  static async logout() {
    await AsyncStorage.setItem('@user_infos', JSON.stringify({}));
  }
}

// TODO : penser à stocker user_id de manière dynamique pour éviter à aller à avoir le chercher à chaque fois pour faire un appel d'API
