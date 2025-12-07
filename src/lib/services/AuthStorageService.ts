import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../constants";

// Todo: Implement state management using Redux instead of localstorage
export const AuthStorageService = {
  saveAuth(token: string, username: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, username);
  },

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getUsername(): string | null {
    return localStorage.getItem(AUTH_USER_KEY);
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  clearAuth() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
};
