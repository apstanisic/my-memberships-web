import { FormControlLabel, Switch, Box } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { capitalize } from "core/utils/helpers";
import { FormikProps } from "formik";
import get from "lodash-es/get";
import React from "react";

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
            onChange={(_, checked) =>
              props.form.setFieldValue(props.name, checked, true)
            }
            name={props.name}
          />
        }
      />
    </Box>
  );
}
