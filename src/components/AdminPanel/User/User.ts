import { BaseEntity, UUID, Image } from "types";
import { Role } from "components/AdminPanel/Roles/Role";

export class User implements BaseEntity {
  id: UUID;
  createdAt: Date;
  email: string;
  name: string;
  avatar?: Image;
  phoneNumber?: string;
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
