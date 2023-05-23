import {AuthService} from './AuthService';

const apiURL = 'https://pact-28.r2.enst.fr';

export class APIService {
  static async get(entrypoint, param, auth = true) {
    let options = {
      method: 'GET',
    };

    if (auth) {
      const accessToken = await AuthService.getAccessToken();
      const userId = await AuthService.getUserId();
      var authHeaders = new Headers();
      authHeaders.append('Authorization', 'Bearer ' + accessToken);
      options.headers = authHeaders;

      var urlPath =
        param === undefined
          ? `${apiURL}/${entrypoint}?user_id=${userId}`
          : `${apiURL}/${entrypoint}/${param}?user_id=${userId}`;

      console.log('[API] Get : ' + urlPath);

      const res = await fetch(urlPath, options);

      if (res.status === 401) {
        const msg = await res.json();
        console.log(
          `[API] Accès à la ressource ${urlPath} impossible : \n`,
          msg,
        );
        await AuthService.refreshAuth();
        const newAccessToken = await AuthService.getAccessToken();

        var newAuthHeaders = new Headers();
        newAuthHeaders.append('Authorization', 'Bearer ' + newAccessToken);
        options.headers = newAuthHeaders;

        const newRes = await fetch(urlPath, options);
        return newRes;
      }
      if (!res.ok) {
        const msg = await res.json();
        console.log(
          `[API] Accès à la ressource ${urlPath} impossible : \n`,
          msg,
        );
      }
      return res;
    } else {
      var urlPath =
        param === undefined
          ? `${apiURL}/${entrypoint}`
          : `${apiURL}/${entrypoint}/${param}`;

      const res = await fetch(urlPath, options);

      return res;
    }
  }

  static async post(entrypoint, data, auth = true) {
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    if (auth) {
      const accessToken = await AuthService.getAccessToken();
      const userId = await AuthService.getUserId();
      var authHeaders = new Headers();
      authHeaders.append('Authorization', 'Bearer ' + accessToken);
      authHeaders.append('Content-Type', 'application/json');
      options.headers = authHeaders;

      var urlPath = `${apiURL}/${entrypoint}?user_id=${userId}`;

      console.log('[APIService] POST de la requêtre : ', urlPath);

      const res = await fetch(urlPath, options);

      if (res.status === 401) {
        const msg = await res.json();
        console.log(
          `[API] Accès à la ressource ${urlPath} impossible : \n`,
          msg,
        );
        await AuthService.refreshAuth();
        const newAccessToken = await AuthService.getAccessToken();

        var newAuthHeaders = new Headers();
        newAuthHeaders.append('Authorization', 'Bearer ' + newAccessToken);
        options.headers = newAuthHeaders;

        const newRes = await fetch(urlPath, options);
        return newRes;
      }
      if (!res.ok) {
        const msg = await res.json();
        console.log(
          `[API] Accès à la ressource ${urlPath} impossible : \n`,
          msg,
        );
      }
      return res;
    } else {
      var urlPath = `${apiURL}/${entrypoint}`;
      const res = await fetch(urlPath, options);
      return res;
    }
  }
}
