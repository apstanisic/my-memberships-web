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
    this.createdAt = new Date(location.createdAt);
    this.workingHours = JSON.parse(location.workingHours);
    this.images = JSON.parse(location.images);
    this.id = location.id;
    this.companyId = location.companyId;
    this.address = location.address;
    this.phoneNumber = location.phoneNumber;
    this.email = location.email;
    this.lat = location.lat;
    this.long = location.long;
  }
}
