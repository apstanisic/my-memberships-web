import { UUID } from "src/types";

export class Payment {
  static readonly NAME = "payments";

  static create(payment: any) {
    return new Payment(payment);
  }

  creditAdded: number;
  price: number;
  companyId: UUID;

  constructor(payment: any) {
    this.creditAdded = payment?.creditAdded;
    this.price = payment?.price;
    this.companyId = payment?.companyId;
  }
}
