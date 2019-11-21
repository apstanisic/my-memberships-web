import { BaseEntity, UUID, Resource } from "types";

export class Role extends Resource implements BaseEntity {
  static NAME = "roles";

  static create(val: any) {
    return new Role(val);
  }

  id: UUID;
  createdAt: Date;
  userId: UUID;
  name: string;
  domain: UUID; // UUID of company
  description?: string;

  constructor(role: any) {
    super();
    this.id = role.id;
    this.createdAt = new Date(role.createdAt);
    this.userId = role.userId;
    this.name = role.name;
    this.domain = role.domain;
    this.description = role.description;
  }
}
