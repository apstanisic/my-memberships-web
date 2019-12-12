// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState, FormEvent } from "react";
import { dataProvider } from "src/components/dataProvider";
import { Company } from "../../Company/Company";

export function AsyncAutocomplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Company[]>([]);
  const loading = open && options.length === 0;
  const [input, setInput] = useState("");

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    dataProvider.getMany("companies").then(companies => {
      if (active) setOptions(companies.data);
    });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Fetch updated list
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value);
    setInput(e.currentTarget.value);
  }

  function getData() {
    dataProvider.getMany("companies", { name: input }).then(companies => {
      setOptions(companies.data);
    });
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option: Company) => option.name}
      autoComplete
      options={options}
      filterOptions={(options, { inputValue }) =>
        options.filter(o =>
          (o.name as string).toLowerCase().includes(inputValue.toLowerCase()),
        )
      }
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Asynchronous"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
