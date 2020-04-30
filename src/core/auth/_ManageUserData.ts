import { StorageKeys } from "./Auth";
import { IUser } from "src/core/auth/IUser";
import { http } from "src/core/http";
import { Storage } from "src/core/Storage";

/**
 * Manage user data. Except password.
 * @member logout is used to logout user after deleting account.
 */
export class ManageUserData<User extends IUser> {
  private storage: Storage;
  private logout: () => void | Promise<void>;

  /* Class has access only to storage and logout method */
  constructor(storage: Storage, logout: () => any) {
    this.storage = storage;
    this.logout = logout;
  }

  /* Change user's password */
  async changePassword(data: ChangePasswordData): Promise<User> {
    return http.put<User>("/auth/password", data).then(res => res.data);
  }

  /**  Change user's info */
  async changeUsersInfo(newInfo: Partial<User>): Promise<User> {
    const updatedUser = await http.put<User>("/auth", newInfo).then(res => res.data);

    await this.storage.set(StorageKeys.User, updatedUser);
    return updatedUser;
  }

  /** Attempt to delete currently logged user */
  async deleteUser(password: string): Promise<void> {
    const { email } = await this.storage.get<User>(StorageKeys.User);
    await http.delete<User>("/auth/account", {
      data: { email, password },
    });

    await this.logout();
  }

  /** Confirm user's email */
  async confirmUsersEmail(email: string, token: string): Promise<User> {
    return http.put<User>(`/auth/confirm-account/${email}/${token}`).then(res => res.data);
  }
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}
