import { Box, Button, Card, CardContent, Toolbar } from "@material-ui/core";
import { Form, Formik, useFormik } from "formik";
import React from "react";
import { Role } from "src/core/auth/Role";
import { User } from "src/core/auth/User";
import { EmailField } from "../common/EmailField";
import { TextInput } from "../common/input/TextInput";
import { ReferenceField } from "../common/ReferenceField";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
import { getFormikConfig } from "../common/formikConfig";

export function RoleEdit() {
  const { form } = useEditOrCreateView({
    transform: Role.create,
    method: "PUT",
  });

  return (
    <Card>
      {/* <CardHeader>Card title</CardHeader> */}
      <Toolbar>
        <span className="text-2xl mx-auto">Edit role</span>
      </Toolbar>
      <CardContent>
        <Box height={220}>
          <ReferenceField
            resourceName="users"
            resourceId={form.values.userId}
            render={(user: User) => {
              return (
                <Box display="flex" justifyContent="space-between" pb={2}>
                  <Box display="flex" flexDirection="column">
                    <h3 className="text-3xl">{user.name}</h3>
                    <EmailField email={user.email} />
                  </Box>
                  <Box minHeight={200} minWidth={200}>
                    <img
                      src={user.avatar?.sm}
                      height="200px"
                      width="200px"
                      alt={user.name + " profile"}
                    />
                  </Box>
                </Box>
              );
            }}
          />
        </Box>

        <Form>
          <TextInput name="description" form={form} />

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
        </Form>
      </CardContent>
    </Card>
  );
}
