import { object, string, ref } from "yup";

const email = string()
  .required()
  .email();
const password = string()
  .required()
  .min(8)
  .max(50);

export const loginValidation = object().shape({ email, password });
export const registerValidation = object().shape({
  email,
  password,
  confirmed: password
    .oneOf([ref("password"), null], "Passwords must match")
    .required(),
  name: string()
    .min(2)
    .max(50)
    .required(),
});
