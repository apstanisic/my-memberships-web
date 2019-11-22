import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { capitalize, Struct } from "core/utils/helpers";
import React from "react";
import { AppIcons } from "../Icons";
import { idMapper } from "../idMapper";
import { ReferenceField } from "./ReferenceField";
import { useUrls } from "./useUrls";

interface Props {
  val: any;
  name: string;
  setFilter: (name: string, val: any) => any;
  buttonClick: (name?: string, val?: any) => any;
}

export function FilterInput<T extends Struct>({
  val,
  name,
  setFilter,
  buttonClick,
}: Props) {
  const info = idMapper(name);
  const urls = useUrls();
  const resourceName = info.resourceName ?? urls.resourceName();

  return (
    <ReferenceField
      resourceId={val}
      resourceName={resourceName}
      render={(resource: T) => {
        return (
          <TextField
            value={resource?.[info.column ?? name]}
            key={name}
            style={{ maxWidth: 250, marginRight: 8 }}
            onChange={({ currentTarget: { name, value } }) =>
              setFilter(name, value)
            }
            label={info.title ?? capitalize(name)}
            name={name}
            variant="outlined"
            margin="dense"
            InputProps={{
              style: { paddingRight: 4 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => buttonClick()}>
                    <AppIcons.Filter />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      buttonClick(name, "");
                    }}
                  >
                    <AppIcons.Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
}
