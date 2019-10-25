import { BaseEntity, UUID } from "types";

export class Subscription implements BaseEntity {
  id: UUID;
  createdAt: Date;
  companyId: string;
  ownerId: UUID;
  startsAt: Date;
  expiresAt: Date;
  price: number;
  type: string;
  allowedUses?: number;
  active: boolean;
  usedAmount: number;
  arrivalIds: UUID[];

  constructor(subscription: any) {
    this.id = subscription.id;
    this.companyId = subscription.companyId;
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
