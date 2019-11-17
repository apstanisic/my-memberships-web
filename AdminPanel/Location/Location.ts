import { Image, UUID } from "types";

export interface Workhours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

/** Location object */
export class Location {
  id: UUID;
  createdAt: Date;
  companyId: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  lat?: number;
  long?: number;
  workingHours: Workhours;
  images: Image[];

  constructor(location: any) {
    if (typeof location.images === "string") {
      this.images = JSON.parse(location.images);
    } else {
      this.images = location.images;
    }
    if (typeof location.workingHours === "string") {
      this.workingHours = JSON.parse(location.workingHours);
    } else {
      this.workingHours = location.workingHours;
    }
    this.createdAt = new Date(location.createdAt);
    this.id = location.id;
    this.companyId = location.companyId;
    this.address = location.address;
    this.phoneNumber = location.phoneNumber;
    this.email = location.email;
    this.lat = location.lat;
    this.long = location.long;
  }
}
