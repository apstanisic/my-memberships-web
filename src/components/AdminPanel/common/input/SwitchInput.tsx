import { Box, FormControlLabel, Switch } from "@material-ui/core";
import { FormikProps } from "formik";
import get from "lodash-es/get";
import React from "react";
import { capitalize } from "src/core/utils/helpers";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
}
export function SwitchInput(props: Props) {
  return (
    <Box py={1}>
      <FormControlLabel
        label={props.label ?? capitalize(props.name)}
        labelPlacement="start"
        control={
          <Switch
            checked={get(props.form.values, props.name, false)}
            onChange={(_, checked) => props.form.setFieldValue(props.name, checked, true)}
            name={props.name}
          />
        }
      />
    </Box>
  );
}
