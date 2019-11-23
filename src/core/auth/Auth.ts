import { IUser } from "src/core/auth/IUser";
import { http } from "src/core/http";
import { Storage } from "src/core/Storage";
import { Role } from "./Role";
import { ManagePassword } from "./_ManagePassword";
import { ManageUserData } from "./_ManageUserData";

/* Keys to access auth store items */
export enum StorageKeys {
  User = "user",
  Token = "token",
}

interface UserAndToken<User extends IUser = IUser> {
  user: User;
  token: string;
}

/**
 * Class used for everything with auth.
 * Has two helper class used for managing password and user data
 */
class AuthController<User extends IUser = IUser> {
  private storage: Storage = new Storage("auth");
  manageUser = new ManageUserData(this.storage, this.logout);
  managePassword = new ManagePassword();
  user?: User;
  /** Is auth controlle inited */
  isInited: boolean = false;

  /** Initialize auth. Return logged user if exists */
  async init(): Promise<User | undefined> {
    const token = await this.storage.get<string>(StorageKeys.Token);

    if (token !== undefined) {
      const user = await this.storage.get<User>(StorageKeys.User);

      this.setAuthHeader(token);
      this.user = user;
      this.isInited = true;
      return user;
    }
    this.isInited = true;
  }

  async isLogged() {
    const token = await this.storage.get(StorageKeys.Token);
    if (!token) return Promise.reject();
  }

  /** Attempt to login user. Throw error if invalid */
  async attemptLogin(email: string, password: string): Promise<User> {
    const { user, token }: UserAndToken<User> = await http
      .post("/auth/login", {
        email,
        password,
      })
      .then(res => res.data);

    this.setAuthHeader(token);
    try {
      const roles = await http
        .get<Role[]>("/auth/account/roles")
        .then(res => res.data);
      user.roles = roles;
    } catch (error) {}

    await this.storage.set(StorageKeys.Token, token);
    await this.storage.set(StorageKeys.User, user);
    this.user = user;
    return user;
  }

  /* Register new user */
  async register(email: string, password: string): Promise<User> {
    const body = { email, password };
    const { user, token } = await http
      .post<{ user: User; token: string }>("/auth/register", { body })
      .then(res => res.data);

    this.setAuthHeader(token);

    await this.storage.set(StorageKeys.Token, token);
    await this.storage.set(StorageKeys.User, user);

    return user;
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
