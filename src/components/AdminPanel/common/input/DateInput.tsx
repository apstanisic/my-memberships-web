import DayjsUtils from "@date-io/dayjs";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePickerProps,
  KeyboardDateTimePickerProps,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { FormikProps } from "formik";
import get from "lodash-es/get";
import React from "react";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
  time?: boolean;
}

export function DateInput(props: Props) {
  const value = get(props.form.values, props.name, null);
  const format = props.time ? "HH:mm DD.MM.YYYY." : "DD.MM.YYYY.";
  const config: KeyboardDateTimePickerProps | KeyboardDatePickerProps = {
    format,
    value,
    margin: "normal",
    inputVariant: "outlined",
    label: props.label ?? "Date picker dialog",
    fullWidth: true,
    onChange: date => props.form.setFieldValue(props.name, date, true),
    name: props.name,
    ...(props.form.errors[props.name] && {
      error: true,
      helperText: props.form.errors[props.name],
    }),
  };

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      {props.time ? (
        <KeyboardDateTimePicker
          {...(config as KeyboardDateTimePickerProps)}
          ampm={false}
        />
      ) : (
        <KeyboardDatePicker {...(config as KeyboardDatePickerProps)} />
      )}
    </MuiPickersUtilsProvider>
  );
}
