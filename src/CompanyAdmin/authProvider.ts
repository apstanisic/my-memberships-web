import { auth } from "core/auth/Auth";

interface Login {
  username: string;
  password: string;
}

export const authProvider = {
  async login({ username, password }: Login) {
    return auth.attemptLogin(username, password);
  },
  async logout(params: any) {
    return auth.logout();
  },
  async checkAuth(params: any) {
    return auth.isLogged();
  },
  checkError: (error: any) => Promise.resolve(),
  getPermissions: (params: any) => Promise.resolve()
};
