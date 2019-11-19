import React from "react";
import DayjsUtils from "@date-io/dayjs";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { FormikProps } from "formik";
import { getNestedValue } from "./getNestedValue";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
}

export function DateInput(props: Props) {
  const value = getNestedValue(props.name, props.form, null);
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardDatePicker
        margin="normal"
        inputVariant="outlined"
        label={props.label ?? "Date picker dialog"}
        format="DD.MM.YYYY."
        value={value}
        fullWidth
        onChange={date => props.form.setFieldValue(props.name, date, true)}
        name={props.name}
        {...(props.form.errors[props.name] && {
          error: true,
          helperText: props.form.errors[props.name],
        })}
      />
    </MuiPickersUtilsProvider>
  );
}
