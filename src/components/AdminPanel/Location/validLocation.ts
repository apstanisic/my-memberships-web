import { Location } from "./Location";
import { number, object, string } from "yup";

export const validLocation = object().shape<Partial<Location>>({
  address: string()
    .min(4)
    .max(200),
  email: string().email(),
  phoneNumber: string()
    .min(5)
    .max(30),
  lat: number()
    .min(-90)
    .max(90),
  long: number()
    .min(-180)
    .max(180),
});
