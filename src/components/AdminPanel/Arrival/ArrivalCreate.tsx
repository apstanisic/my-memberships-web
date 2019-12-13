import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { ReferenceSelectInput } from "../Common/Input/Async2";
import { useEditOrCreateView } from "../Common/useEditView";
import { Arrival } from "./Arrival";
import { validArrival } from "./validArrival";

export function ArrivalCreate() {
  const [arrival, onSubmit, cancel] = useEditOrCreateView(
    Arrival.create,
    "POST",
  );

  return (
    <Formik
      initialValues={arrival ?? {}}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
      validationSchema={validArrival}
      // onSubmit={val => console.log(val)}
    >
      {props => (
        <Card className="max-w-3xl mx-auto">
          <Box textAlign="center" pt={3}>
            <Typography variant="h5" component="p">
              Add new arrival
            </Typography>
          </Box>
          <CardContent>
            <Form>
              {/* <TextInput name="name" form={props} /> */}
              {/* <TextInput name="description" form={props} /> */}
              <ReferenceSelectInput
                label="Location"
                field="name"
                idField="locationId"
                resourceName="locations"
                form={props}
              />
              <ReferenceSelectInput
                label="User"
                field="email"
                idField="userId"
                resourceName="subscriptions/active-users"
                form={props}
              />

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
