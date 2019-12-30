import { Box, Select, MenuItem } from "@material-ui/core";
import { FormikProps } from "formik";
import get from "lodash-es/get";
import React from "react";

type SelectItems = (
  | {
      value: any;
      text: any;
    }
  | string
)[];

interface Props {
  name: string;
  form: FormikProps<any>;
  // Will be called in addition to form.onChange
  onChangeHook?: (val: any, name?: string) => any;
  label?: string;
  options: SelectItems;
  disabled?: boolean;
}

export function SelectInput(props: Props) {
  const value = get(props.form.values, props.name) ?? "placeholder";

  return (
    <Box py={1}>
      <Select
        value={value}
        name={props.name}
        disabled={props.disabled}
        onChange={(e, c) => {
          const { name, value } = e.target;

          props.form.handleChange(e);

          if (props.onChangeHook) {
            props.onChangeHook(value, name);
          }
        }}
        variant="outlined"
        fullWidth
        {...(props.form.errors[props.name] && {
          error: true,
          helperText: props.form.errors[props.name],
        })}
      >
        <MenuItem value="placeholder" disabled>
          {props.label ?? props.name}
        </MenuItem>
        {props.options.map((option, i) => (
          <MenuItem
            key={i}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
