import { IUser } from "core/auth/IUser";
import { ManagePassword } from "./_ManagePassword";
import { ManageUserData } from "./_ManageUserData";
import { Storage } from "core/Storage";
import { http } from "core/http";

/* Keys to access auth store items */
export enum StorageKeys {
  User = "user",
  Token = "token"
}

/**
 * Class used for everything with auth.
 * Has two helper class used for managing password and user data
 */
class AuthController<User extends IUser = IUser> {
  private storage: Storage = new Storage("auth");
  manageUser = new ManageUserData(this.storage, this.logout);
  managePassword = new ManagePassword();

  /** Initialize auth. Return logged user if exists */
  async init(): Promise<User | void> {
    const token = await this.storage.get<string>(StorageKeys.Token);
    if (token !== undefined) {
      const user = await this.storage.get<User>(StorageKeys.User);
      this.setAuthHeader(token);
      return user;
    }
  }

  /** Attempt to login user. Throw error if invalid */
  async attemptLogin(email: string, password: string): Promise<User> {
    const { user, token } = await http
      .post<{ user: User; token: string }>("/auth/login", { email, password })
      .then(res => res.data);

    this.setAuthHeader(token);
    await this.storage.set(StorageKeys.Token, token);
    await this.storage.set(StorageKeys.User, user);
    return user;
  }

  /* Register new user */
  async register(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const body = { email, password };
    const { user, token } = await http
      .post<{ user: User; token: string }>("/auth/register", { body })
      .then(res => res.data);

    this.setAuthHeader(token);

    await this.storage.set(StorageKeys.Token, token);
    await this.storage.set(StorageKeys.User, user);

    return { user, token };
  }

  /* Logout user */
  async logout(): Promise<void> {
    await this.storage.delete(StorageKeys.Token);
    await this.storage.delete(StorageKeys.User);
    delete http.defaults.headers["Authorization"];
  }

  /* Set Auth token */
  private setAuthHeader(token: string): void {
    http.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export const auth = new AuthController();
