import { BaseEntity, UUID } from "src/types";
import { IUser } from "src/core/auth/IUser";

export class Subscription implements BaseEntity {
  static readonly NAME = "subscriptions";
  static readonly ID = "subscriptionId";

  static create(subscription: any): Subscription {
    return new Subscription(subscription);
  }

  id: UUID;
  createdAt: Date;
  owner: IUser;
  companyId: string;
  ownerId: UUID;
  startsAt: Date;
  expiresAt: Date;
  price: number;
  type: string;
  allowedUses: number | null;
  active: boolean;
  usedAmount: number;
  arrivalIds: UUID[];

  constructor(subscription: any) {
    this.id = subscription.id;
    this.companyId = subscription.companyId;
    this.owner = subscription.owner;
    this.ownerId = subscription.ownerId;
    this.price = subscription.price;
    this.type = subscription.type;
    this.allowedUses = subscription.allowedUses;
    this.active = subscription.active;
    this.usedAmount = subscription.usedAmount;
    this.arrivalIds = subscription.arrivalIds;
    this.createdAt = new Date(subscription.createdAt);
    this.startsAt = new Date(subscription.startsAt);
    this.expiresAt = new Date(subscription.expiresAt);
  }
}
