export const LS_KEYS = {
  USER_ID: '__USER_ID',
  SOCKET_ID: '__SOCKET_ID',
}

export class LocalStorageHelper {
  static get(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static remove(key: string) {
    return localStorage.removeItem(key);
  }

  static set(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static clear() {
    localStorage.clear();
  }
}