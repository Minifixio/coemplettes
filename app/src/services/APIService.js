const apiURL = 'http://137.194.211.70';

export class APIService {
  static async get(entrypoint, param) {
    if (param === undefined) {
      console.log(`GET : ${apiURL}/${entrypoint}`);
      return fetch(`${apiURL}/${entrypoint}`);
    } else {
      console.log(`GET : ${apiURL}/${entrypoint}/${param}`);
      return fetch(`${apiURL}/${entrypoint}/${param}`);
    }
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
