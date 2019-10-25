import { Image } from "types";

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
export interface Location {
  id: string;
  createdAt: Date;
  companyId: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  lat?: number;
  long?: number;
  workingHours: Workhours;
  images: Image[];
}

/**
 * Request will return working hours as an json string. This method
 * parses jsons where needed
 */
export function parseLocations(location: any): Location {
  const parsed: Location = { ...location };
  parsed.createdAt = new Date(location.createdAt);
  parsed.workingHours = JSON.parse(location.workingHours);
  parsed.images = JSON.parse(location.images);

  return parsed;
}
