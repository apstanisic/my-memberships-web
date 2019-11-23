import { BaseEntity, UUID, Image, ImageSizes } from "src/types";
import { Role } from "./Role";

export class User implements BaseEntity {
  static NAME = "users";
  static readonly ID = `userId`;

  static create(val: any) {
    return new User(val);
  }

  id: UUID;
  createdAt: Date;
  email: string;
  name: string;
  avatar?: ImageSizes | null;
  phoneNumber?: string | null;
  roles?: Role[];

  constructor(user: any) {
    this.id = user.id;
    this.createdAt = new Date(user.createdAt);
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar ? JSON.parse(user.avatar) : undefined;
    this.phoneNumber = user.phoneNumber;
  }
}
