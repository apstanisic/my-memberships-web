import { BaseEntity, UUID } from "types";

export class Role implements BaseEntity {
  id: UUID;
  createdAt: Date;
  userId: UUID;
  name: string;
  domain: UUID; // UUID of company
  description?: string;
  constructor(role: any) {
    this.id = role.id;
    this.createdAt = new Date(role.createdAt);
    this.userId = role.userId;
    this.name = role.name;
    this.domain = role.domain;
    this.description = role.description;
  }
}
