import { Role } from "components/AdminPanel/Roles/Role";

/** User in every app must have this fields */
export interface IUser {
  id: string;
  email: string;
  name?: string;
  roles: Role[];
  [key: string]: any;
}
