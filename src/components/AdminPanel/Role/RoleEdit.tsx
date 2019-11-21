import { Button, Card, CardContent } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { Role } from "core/auth/Role";
import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "../Common/TextInput";
import { useEdit } from "../Common/useEdit";

export function RoleEdit() {
  const [role, onSubmit, cancel] = useEdit(Role.create);

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

              <Padding grow side="t" size={3}>
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
              </Padding>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}
