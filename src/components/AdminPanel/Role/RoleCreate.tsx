import {
  Box,
  Button,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { Role } from "src/core/auth/Role";
import { ReferenceSelectInput } from "../Common/Input/ReferenceSelectInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { JLog } from "../Common/JLog";

export function RoleCreate() {
  const [role, onSubmit, cancel] = useEditOrCreateView({
    transform: Role.create,
    method: "POST",
  });

  return (
    <Formik
      initialValues={role ?? {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {props => (
        <Card className="max-w-3xl mx-auto">
          <Box textAlign="center" pt={3}>
            <Typography variant="h5" component="p">
              Add new role
            </Typography>
          </Box>
          <CardContent>
            <Form>
              <div>
                <ReferenceSelectInput
                  fieldToShow="email"
                  idField="userId"
                  label="User"
                  resourceName="subscriptions/users"
                  form={props}
                />
                <Box p={1}>
                  <Select
                    value={props.values.name ?? "placeholder"}
                    name="name"
                    onChange={props.handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="placeholder" disabled>
                      Select role
                    </MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="owner">Owner</MenuItem>
                  </Select>
                </Box>
                <Box p={1}>
                  <TextField
                    label="Description"
                    multiline
                    rows="5"
                    variant="outlined"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                    fullWidth
                  />
                </Box>
              </div>
              <Box flexGrow={1} pt={2}>
                <Button
                  type="submit"
                  disabled={props.isSubmitting}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>

    //     <ReferenceInput source="userId" reference="auth/users">
    //     <SelectInput optionText="id" />
    //   </ReferenceInput>
    //   <TextInput source="name" />
    //   {/* <TextInput source="domain" /> */}
    //   <TextInput source="description" />
  );
}
