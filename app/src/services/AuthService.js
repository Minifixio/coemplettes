import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIService} from './APIService';

export class AuthService {
  static async register(user, password) {
    console.log('[Auth] Registering user...');
    try {
      const res = await APIService.post('register', {user, password});
      if (res.status === 401) {
        console.log('[Auth] Register failed (unauthorized): ', res.body);
      }
      if (!res.ok) {
        console.log('[Auth] Register failed : ', res.body);
      }

      const tokens = await res.json();
      await this.storeTokens(tokens);
    } catch (e) {
      console.log('[Auth] Register failed : ', e);
    }
  }

  static async login(email, password) {
    try {
      const res = await APIService.post('login', {email, password});

      if (res.status === 401) {
        console.log('[Auth] Login failed (unauthorized): ', res.body);
      }
      if (!res.ok) {
        console.log('[Auth] Login failed : ', res.body);
      }

      const tokens = await res.json();
      await this.storeTokens(tokens);
    } catch (e) {
      console.log('[Auth] Login failed : ', e);
    }
  }

  static async storeTokens(tokens) {
    console.log('[Auth] Storing new tokens');
    try {
      const tokensJSON = JSON.stringify(tokens);
      await AsyncStorage.setItem('tokens', tokensJSON);
    } catch (e) {
      console.log('[Auth] Failed to store tokens in local storage');
    }
  }

  static async storeUserInfos() {}
}
