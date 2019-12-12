// import debounce from "lodash-es/debounce";
import isEqual from "lodash-es/isEqual";
import React, { useEffect, useRef, useState } from "react";
import { useMountedState } from "react-use";
import { BehaviorSubject } from "rxjs";
import { Autocomplete } from "@material-ui/lab";
import { debounceTime, filter } from "rxjs/operators";
import { convertSearch } from "src/components/dataProvider";
import { http } from "src/core/http";
import { Struct } from "src/core/utils/helpers";
import { useUrls } from "../useUrls";
import { TextField, Box } from "@material-ui/core";
// import { AsyncAutocomplete } from "./AsyncAutocomplete";
// import { AsyncAutocomplete } from "./Async2";
import { FormikProps } from "formik";

interface Props {
  resourceName: string;
  filters?: Struct;
  fieldName: string;
  label: string;
  form: FormikProps<any>;
}

export const ReferenceSelectInput = React.memo(
  function ReferenceSelectInput({
    resourceName,
    filters,
    fieldName,
    label,
  }: Props) {
    let url = useUrls().remoteBase(resourceName);
    if (resourceName === "users") url = "users";

    return (
      <Box p={1}>
        {/* <AsyncAutocomplete resourceName={url} field={fieldName} label={label} /> */}
      </Box>
    );
  },
  // @TODO fix this. I don't know why it's rerenders when values are same
  // And i dont know why parent component sends refreshed values
  (prev, next) => isEqual(prev, next),
);
