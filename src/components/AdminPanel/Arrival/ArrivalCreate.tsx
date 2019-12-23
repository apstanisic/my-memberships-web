import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { ReferenceSelectInput } from "../Common/Input/ReferenceSelectInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { Arrival } from "./Arrival";
import { validArrival } from "./validArrival";
import { TextInput } from "../Common/Input/TextInput";
import { DateInput } from "../Common/Input/DateInput";

export function ArrivalCreate() {
  const [arrival, onSubmit, cancel] = useEditOrCreateView({
    transform: Arrival.create,
    method: "POST",
    changeDefaultValue: (val: Arrival) => {
      val.arrivedAt = new Date();
    },
  });

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
                fieldToShow="name"
                idField="locationId"
                resourceName="locations"
                form={props}
              />
              <ReferenceSelectInput
                label="User"
                fieldToShow="email"
                idField="userId"
                resourceName="subscriptions/users"
                form={props}
                filter={{ active: true }}
              />
              <DateInput
                form={props}
                name="arrivedAt"
                label="Arrived at"
                time
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
