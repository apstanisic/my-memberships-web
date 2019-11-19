import { Switch, FormControlLabel } from "@material-ui/core";
import { FormikProps } from "formik";
import { capitalize } from "core/utils/helpers";
import React from "react";
import { getNestedValue } from "./getNestedValue";
import { Padding } from "components/common/Padding";

interface Props {
  name: string;
  form: FormikProps<any>;
  label?: string;
}
export function SwitchInput(props: Props) {
  return (
    <Padding side="y" size={2}>
      <FormControlLabel
        label={props.label ?? capitalize(props.name)}
        labelPlacement="start"
        control={
          <Switch
            checked={Boolean(getNestedValue(props.name, props.form))}
            onChange={(_, checked) =>
              props.form.setFieldValue(props.name, checked, true)
            }
            name={props.name}
          />
        }
      />
    </Padding>
  );
}
