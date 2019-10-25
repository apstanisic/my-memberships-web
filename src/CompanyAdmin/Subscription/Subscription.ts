import { BaseEntity } from "types";

export interface Subscription extends BaseEntity {
  companyId: string;
  ownerId: string;
  startsAt: Date;
  expiresAt: Date;
  price: number;
  type: string;
  allowedUses?: number;
  active: boolean;
  usedAmount: number;
  arrivalIds: string[];
}

export function parseSubscription(sub: any) {
  const parsed: Subscription = { ...sub };
  parsed.createdAt = new Date(sub.createdAt);
  parsed.startsAt = new Date(sub.startsAt);
  parsed.expiresAt = new Date(sub.expiresAt);
}
