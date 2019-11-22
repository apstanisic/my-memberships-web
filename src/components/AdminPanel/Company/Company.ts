import { BaseEntity, UUID } from "src/types";

export class Company implements BaseEntity {
  id: UUID;
  createdAt: Date;
  name: string;
  ownerId: UUID;
  category: string;
  description: string;
  phoneNumbers: string[];
  emails: string[];
  credit: number;
  images: any[];

  constructor(company: any) {
    this.id = company.id;
    this.createdAt = new Date(company.createdAt);
    this.name = company.name;
    this.ownerId = company.ownerId;
    this.category = company.category;
    this.description = company.description;
    this.credit = company.credit;
    this.images = company.images;

    if (typeof company.phoneNumbers === "string") {
      this.phoneNumbers = JSON.parse(company.phoneNumbers);
    } else {
      this.phoneNumbers = company.phoneNumbers;
    }

    if (typeof company.emails === "string") {
      this.emails = JSON.parse(company.emails);
    } else {
      this.emails = company.emails;
    }
  }
}
