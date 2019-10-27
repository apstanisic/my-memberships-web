import { BaseEntity, UUID } from "types";

export class PricingPlan implements BaseEntity {
  id: UUID;
  createdAt: Date;
  creditCost: number;
  companyId: string;
  startsAt: Date;
  expiresAt: Date;
  tier: string;
  autoRenew: boolean;
  inUse: boolean;

  constructor(plan: any) {
    this.id = plan.id;
    this.createdAt = plan.createdAt;
    this.creditCost = plan.creditCost;
    this.companyId = plan.companyId;
    this.startsAt = plan.startsAt;
    this.expiresAt = plan.expiresAt;
    this.tier = plan.tier;
    this.autoRenew = plan.autoRenew;
    this.inUse = plan.inUse;
  }
}
