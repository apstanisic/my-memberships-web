import { object, string } from "yup";
import { Arrival } from "./Arrival";

export const validArrival = object().shape<Partial<Arrival>>({
  userId: string()
    .required()
    // there is not uuid check
    .min(36)
    .max(36),
  locationId: string()
    .required()
    .min(36)
    .max(36),
});
