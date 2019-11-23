import { Location } from "./Location";
import { number, object, string } from "yup";

export const validLocation = object().shape<Partial<Location>>({
  name: string()
    .required()
    .min(2)
    .max(100),
  address: string()
    .required()
    .min(4)
    .max(200),
  email: string()
    .notRequired()
    .nullable()
    .email(),
  phoneNumber: string()
    .nullable()
    .notRequired()
    .min(5)
    .max(30),
  lat: number()
    .nullable()
    .notRequired()
    .min(-90)
    .max(90),
  long: number()
    .nullable()
    .notRequired()
    .min(-180)
    .max(180),
});
