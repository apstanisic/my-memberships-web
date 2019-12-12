import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import throttle from "lodash-es/throttle";
import React, { useEffect, useMemo, useState } from "react";
import { dataProvider } from "src/components/dataProvider";
import { Company } from "../../Company/Company";
import { WithId } from "src/types";
import { useUrls } from "../useUrls";
import { Box } from "@material-ui/core";
import { FormikProps } from "formik";
import isEqual from "lodash-es/isEqual";

interface Props {
  resourceName: string; // resource name
  field: string; // Field to show
  label: string; // label
  form: FormikProps<any>; // form
  idField: string;
}

export const ReferenceSelectInput = React.memo(
  function AsyncAutocomplete({
    label,
    resourceName,
    field,
    form,
    idField,
  }: Props) {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<WithId[]>([]);
    resourceName = useUrls().remoteBase(resourceName);
    if (resourceName === "users") resourceName = "users";

    const fetch = useMemo(
      () =>
        // Throttle not working currently
        throttle((callback: any) => {
          dataProvider
            .getMany(resourceName, { [`${field}__lk`]: inputValue })
            .then(response => {
              callback(response.data);
            });
        }, 5000),
      [field, inputValue, resourceName],
    );

    useEffect(() => {
      let active = true;

      // Prefetch some options
      // if (inputValue === "") {
      //   setOptions([]);
      //   return undefined;
      // }

      fetch((results?: WithId[]) => {
        if (active) {
          setOptions(results ?? []);
        }
      });

      return () => {
        active = false;
      };
    }, [inputValue, fetch]);

    return (
      <Box p={1} display="flex">
        <Autocomplete
          style={{ width: "100%" }}
          getOptionLabel={option =>
            typeof option === "string" ? option : option[field]
          }
          filterOptions={(options, { inputValue }) =>
            options.filter(option =>
              // If undefined convert make it a string, and convert it to string
              // This will always be string, and wont be "undefined"
              // It will convert number to string so it will have toLowerCase
              ((option[field] ?? "") + "")
                .toLowerCase()
                .includes(inputValue.toLowerCase()),
            )
          }
          options={options}
          autoComplete
          includeInputInList
          onInputChange={(e, value) => setInputValue(value)}
          // When autocomplete changes take id and put it in idField
          onChange={(e, value) => form.setFieldValue(idField, value?.id)}
          renderInput={params => (
            <TextField {...params} label={label} variant="outlined" fullWidth />
          )}
        />
      </Box>
    );
  },
  (prev, next) => isEqual(prev, next),
);
