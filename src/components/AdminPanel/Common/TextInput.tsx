import React from "react";
import { TextField } from "@material-ui/core";
import { FormikProps } from "formik";
import { Padding } from "components/common/Padding";
import { getNestedValue } from "./getNestedValue";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
  type?: string;
}

/**
 *  Uppercase first letter of word
 */
function upperCase(val: string) {
  return val.split(" ").map(word => word[0].toUpperCase() + word.substr(1));
}

export function TextInput(props: Props) {
  const value = getNestedValue(props.name, props.form);
  return (
    <Padding side="y" size={2}>
      <TextField
        value={value}
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
    </Padding>
  );
}
