import React from "react";
import { TextField, Box } from "@material-ui/core";
import { FormikProps } from "formik";
import get from "lodash-es/get";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
  type?: string;
  disabled?: boolean;
}

/**
 *  Uppercase first letter of word
 */
function upperCase(val: string) {
  return val.split(" ").map(word => word[0].toUpperCase() + word.substr(1));
}

export function TextInput(props: Props) {
  const value = get(props.form.values, props.name) ?? "";

  return (
    <Box py={1}>
      <TextField
        value={value}
        disabled={props.disabled}
        onChange={props.form.handleChange}
        label={props.label ? props.label : upperCase(props.name)}
        name={props.name}
        variant="outlined"
        type={props.type ? props.type : "text"}
        fullWidth
        {...(props.form.errors[props.name] && {
          error: true,
          helperText: props.form.errors[props.name],
        })}
      />
    </Box>
  );
}
