import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { ReferenceSelectInput } from "../common/input/ReferenceSelectInput";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
import { Arrival } from "./Arrival";
import { validArrival } from "./validArrival";
import { Location } from "../Location/Location";

export function ArrivalCreate() {
  const { form } = useEditOrCreateView({
    transform: Arrival.create,
    method: "POST",
    config: { validationSchema: validArrival },
  });

  return (
    <Card className="max-w-3xl mx-auto">
      <Box textAlign="center" pt={3}>
        <Typography variant="h5" component="p">
          Add new arrival
        </Typography>
      </Box>
      <CardContent>
        <form onSubmit={form.handleSubmit}>
          <ReferenceSelectInput
            label="Location"
            fieldToShow="name"
            idField="locationId"
            resourceName={Location.NAME}
            form={form}
          />
          <ReferenceSelectInput
            label="User"
            fieldToShow="email"
            idField="userId"
            resourceName="subscriptions/users"
            form={form}
            filter={{ active: true }}
          />

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
