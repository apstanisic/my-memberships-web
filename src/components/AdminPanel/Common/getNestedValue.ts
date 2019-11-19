import { FormikProps } from "formik";

export function getNestedValue(
  name: string,
  form: FormikProps<any>,
  defaultValue: any = "",
) {
  let value = defaultValue;
  try {
    // https://stackoverflow.com/questions/6393943
    value = name.split(".").reduce((o, i) => o[i], form.values);
    if (!value) value = defaultValue;
  } catch (error) {}
  return value;
}
