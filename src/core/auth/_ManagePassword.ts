import { Http } from "src/core/http";
import { IUser } from "src/core/auth/IUser";

/** Params needed for password reset */
interface ResetPasswordParams {
  password: string;
  email: string;
  token: string;
}

/** Params needed for changing password */
interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

/* class used to manage user password */
export class ManagePassword<User extends IUser> {
  /* Change user's password */
  async changePassword(data: ChangePasswordData): Promise<User> {
    return Http.put("/auth/password", data).then(res => res.data);
  }

  /**
   * Request that email be sent to this account's email
   * with instruction to reset forgotten password.
   */
  async requestPasswordResetEmail(email: string): Promise<void> {
    await Http.post(`/auth/forgot-password/${email}`);
  }

  /* Reset password with token for reseting */
  async resetPassword({
    email,
    token,
    password,
  }: ResetPasswordParams): Promise<User> {
    return Http.post(`/auth/reset-password/${email}`, { password, token }).then(
      res => res.data,
    );
  }
}
