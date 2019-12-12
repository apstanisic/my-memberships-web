import { Box, Button, Card, CardContent, CardHeader } from "@material-ui/core";
import { Padding } from "src/components/common/Padding";
import { Role } from "src/core/auth/Role";
import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "../Common/Input/TextInput";
import { useEditOrCreateView } from "../Common/useEditView";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "src/core/auth/User";
import { UserReference } from "../User/UserReference";
import { EmailField } from "../Common/EmailField";

export function RoleEdit() {
  const [role, onSubmit, cancel] = useEditOrCreateView(Role.create, "PUT");

  return (
    <Formik
      initialValues={role ?? {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {props => (
        <Card>
          {/* <CardHeader>Card title</CardHeader> */}
          <h1>Edit subscription</h1>
          <CardContent>
            <Box height={220}>
              <ReferenceField
                resourceName="users"
                resourceId={props.values.userId}
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
              <TextInput name="name" form={props} />
              <TextInput name="description" form={props} />

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
  );
}
