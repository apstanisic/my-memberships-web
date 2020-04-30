import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, useFormik } from "formik";
import React from "react";
import { Role } from "src/core/auth/Role";
import { ReferenceSelectInput } from "../common/input/ReferenceSelectInput";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
import { getFormikConfig } from "../common/formikConfig";

export function RoleCreate() {
  const { form } = useEditOrCreateView({
    transform: Role.create,
    method: "POST",
  });

  return (
    <Card className="max-w-3xl mx-auto">
      <Box textAlign="center" pt={3}>
        <Typography variant="h5" component="p">
          Add new role
        </Typography>
      </Box>
      <CardContent>
        <form onSubmit={form.handleSubmit}>
          <div>
            <ReferenceSelectInput
              fieldToShow="email"
              idField="userId"
              label="User"
              resourceName="subscriptions/users"
              form={form}
            />
            <Box py={1}>
              <Select
                value={form.values.name ?? "placeholder"}
                name="name"
                onChange={form.handleChange}
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
            <Box py={1}>
              <TextField
                label="Description"
                multiline
                rows="5"
                variant="outlined"
                name="description"
                value={form.values.description}
                onChange={form.handleChange}
                fullWidth
              />
            </Box>
          </div>
          <Box flexGrow={1} pt={2}>
            <Button
              type="submit"
              disabled={form.isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
