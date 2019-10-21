/** User in every app must have this fields */
export interface IUser {
  id: string;
  email: string;
  name?: string;
  [key: string]: any;
}
