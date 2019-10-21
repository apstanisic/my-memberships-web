import http from "core/http";
import Storage from "core/storage";
import { StorageKeys } from "./Auth";
import { IUser } from "core/IUser";

/* Class user for changing user data */
export default class AuthManageUser<User extends IUser> {
  private storage: Storage;
  private logout: () => any;

  /* Class has access only to storage and logout method */
  constructor(storage: Storage, logout: () => any) {
    this.storage = storage;
    this.logout = logout;
  }

  /* Change user password */
  async changePassword(data: ChangePasswordData): Promise<User> {
    return http.put("/auth/password", data).then(res => res.data);
  }
  /* Change user info */
  async changeUserInfo(newInfo: Partial<IUser>): Promise<IUser> {
    const updatedUser = await http
      .put<IUser>("/auth", newInfo)
      .then(res => res.data);

    await this.storage.set(StorageKeys.User, updatedUser);
    return updatedUser;
  }

  async deleteUser(password: string) {
    const { email } = await this.storage.get<IUser>(StorageKeys.User);
    await http.delete("/auth/account", {
      data: { email, password }
    });

    await this.logout();
  }

  async confirmUser(email: string, token: string) {
    return http
      .put<IUser>(`/auth/confirm-account/${email}/${token}`)
      .then(res => res.data);
  }
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}
