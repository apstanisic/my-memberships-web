import { Box, Button, Card, CardContent } from "@material-ui/core";
import { Padding } from "src/components/common/Padding";
import { Role } from "src/core/auth/Role";
import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "../Common/Input/TextInput";
import { useEditView } from "../Common/useEditView";

export function RoleEdit() {
  const [role, onSubmit, cancel] = useEditView(Role.create);

  return (
    <Formik
      initialValues={role || {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {props => (
        <Card>
          <CardContent>
            <Form>
              <TextInput name="name" form={props} />
              <TextInput name="description" form={props} />
              <TextInput name="userId" form={props} disabled />

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
