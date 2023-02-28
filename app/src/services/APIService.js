const apiURL = 'http://137.194.211.70';

export class API {
  static async get(entrypoint, param) {
    return param
      ? fetch(`${apiURL}/${entrypoint}/${param}`).json()
      : fetch(`${apiURL}/${entrypoint}`).json();
  }

  static async post(entrypoint, data) {
    return fetch(`${apiURL}/${entrypoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
