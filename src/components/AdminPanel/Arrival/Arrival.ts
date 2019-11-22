import { BaseEntity, Resource, UUID } from "types";

export class Arrival extends Resource implements BaseEntity {
  static NAME = "arrivals";
  static readonly ID = `arrivalId`;

  static create(val: any) {
    return new Arrival(val);
  }

  id: UUID;
  createdAt: Date;
  subscriptionId: UUID;
  locationId?: UUID;
  companyId: string;
  userId: UUID;
  arrivedAt: Date;
  leftAt?: Date;
  address?: string;
  lat?: number;
  long?: number;
  approvedBy?: UUID;
  timeSpent?: number;

  constructor(arrival: any) {
    super();
    this.id = arrival.id;
    this.createdAt = new Date(arrival.createdAt);
    this.subscriptionId = arrival.subscriptionId;
    this.locationId = arrival.locationId;
    this.userId = arrival.userId;
    this.companyId = arrival.companyId;
    this.arrivedAt = new Date(arrival.arrivedAt);
    this.leftAt = arrival.leftAt ? new Date(arrival.leftAt) : undefined;
    this.address = arrival.address;
    this.lat = arrival.lat;
    this.long = arrival.long;
    this.approvedBy = arrival.approvedBy;
    this.timeSpent = arrival.timeSpent;
  }
}
