import { Subscription } from "./Subscription";
import { number, object, string, boolean, date } from "yup";

export const validSubscription = object().shape<Partial<Subscription>>({
  active: boolean(),
  expiresAt: date(),
  startsAt: date(),
  price: number()
    .min(0)
    .max(1000000),
  usedAmount: number()
    .min(0)
    .max(1000),
  allowedUses: number()
    .nullable()
    .integer(),
  type: string()
    .min(2)
    .max(150),
});
