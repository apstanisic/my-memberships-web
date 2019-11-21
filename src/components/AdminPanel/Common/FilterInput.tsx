import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { AppIcons } from "../Icons";
import { capitalize } from "core/utils/helpers";
import { ReferenceField } from "./ReferenceField";
import { Location } from "../Location/Location";

interface Props {
  val: any;
  name: string;
  setFilter: (name: string, val: any) => any;
  buttonClick: (name?: string, val?: any) => any;
}

export const FilterInput = ({ val, name, setFilter, buttonClick }: Props) => {
  return (
    <ReferenceField
      resourceId={val}
      resourceName="locations"
      render={(loc: Location) => {
        console.log(loc);

        return (
          <TextField
            value={loc.name}
            key={name}
            style={{ maxWidth: 250, marginRight: 8 }}
            onChange={({ currentTarget: { name, value } }) =>
              setFilter(name, value)
            }
            label={capitalize(name)}
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
};
