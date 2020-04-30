import { FormikConfig } from "formik";

const defaultFormikConfig: Partial<FormikConfig<any>> = {
  enableReinitialize: true,
  validateOnChange: false,
};

/** Get formik config with some values predefined. Pass initial data in config */
export function getFormikConfig<Resource>(config: FormikConfig<Resource>): FormikConfig<Resource> {
  return { ...defaultFormikConfig, ...config };
}
