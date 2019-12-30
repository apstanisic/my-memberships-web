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
import { Struct } from "src/core/utils/helpers";

interface Props {
  resourceName: string; // resource name
  fieldToShow: string; // Field to show
  label: string; // label
  form: FormikProps<any>; // form
  idField: string;
  filter?: Struct;
  freeSoloField?: string;
}

export const ReferenceSelectInput = React.memo(
  function AsyncAutocomplete({
    label,
    resourceName,
    fieldToShow: field,
    form,
    idField,
    filter,
    freeSoloField,
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
            .getMany(resourceName, {
              ...(filter ?? {}),
              [`${field}__lk`]: inputValue,
            })
            .then(response => {
              callback(response.data);
            });
        }, 5000),
      [field, filter, inputValue, resourceName],
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
      <Box py={1} display="flex">
        <Autocomplete
          autoHighlight
          freeSolo={freeSoloField !== undefined}
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
          // When autocomplete changes take id and put it in idField
          onChange={(e, value) => form.setFieldValue(idField, value?.id)}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              name={idField}
              onChange={e => {
                const { value } = e.currentTarget;
                // remove id field if free solo is enabled
                if (freeSoloField) {
                  form.setFieldValue(idField, undefined);
                  form.setFieldValue(freeSoloField, value);
                }
                setInputValue(value);
              }}
              fullWidth
              {...(form.errors[idField] && {
                error: true,
                helperText: form.errors[idField],
              })}
            />
          )}
        />
      </Box>
    );
  },
  (prev, next) => isEqual(prev, next),
);
