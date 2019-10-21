import http from "core/http";
import { IUser } from "core/IUser";

/* class used to manage user password */
export default class AuthManagePassword<User extends IUser> {
  /* Change user password */
  async changePassword(data: ChangePasswordData): Promise<User> {
    return http.put("/auth/password", data).then(res => res.data);
  }

  /* Get link for reseting password */
  async getResetLink(email: string): Promise<any> {
    http.post(`/auth/forgot-password/${email}`).then(res => res.data);
  }

  /* Try to reset password. Token is coming from recieved mail */
  async resetPassword({
    email,
    token,
    password
  }: ResetPasswordParams): Promise<User> {
    return http
      .post(`/auth/reset-password/${email}/${token}`, { email, password })
      .then(res => res.data);
  }
}

interface ResetPasswordParams {
  password: string;
  email: string;
  token: string;
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}
