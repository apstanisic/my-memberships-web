import { Box, Button, Card, CardContent, Toolbar } from "@material-ui/core";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import React from "react";
import { DateInput } from "../Common/Input/DateInput";
import { SwitchInput } from "../Common/Input/SwitchInput";
import { TextInput } from "../Common/Input/TextInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { Subscription } from "./Subscription";
import { ReferenceSelectInput } from "../Common/Input/ReferenceSelectInput";
import { JLog } from "../Common/JLog";

export function SubscriptionCreate() {
  const [subscription, onSubmit, cancel] = useEditOrCreateView({
    transform: Subscription.create,
    method: "POST",
    changeDefaultValue: (val: Subscription) => {
      if (val) {
        val.active = true;
        val.startsAt = new Date();
        val.expiresAt = dayjs()
          .add(1, "month")
          .subtract(1, "day")
          .toDate();
      }
    },
  });

  return (
    <Formik
      initialValues={subscription ?? ({} as Subscription)}
      enableReinitialize={true}
      validateOnChange={false}
      onSubmit={onSubmit}
      // validationSchema={validLocation}
    >
      {props => (
        <Card>
          <CardContent>
            <Form>
              <div>
                <Toolbar>
                  <Box className="text-2xl mx-auto">Add subscription</Box>
                </Toolbar>
                <ReferenceSelectInput
                  freeSoloField="ownerEmail"
                  form={props}
                  label="User"
                  fieldToShow="email"
                  idField="ownerId"
                  resourceName="subscriptions/users"
                />

                <JLog render={() => console.log(props.values)} />
                <SwitchInput name="active" form={props} label="Active" />
                <TextInput name="type" form={props} />
                <TextInput name="price" form={props} type="number" />
                <DateInput form={props} name="startsAt" label="Starts at" />
                <DateInput form={props} name="expiresAt" label="Expires at" />
                <TextInput
                  name="allowedUses"
                  form={props}
                  type="number"
                  label="Allowed Uses (leave empty for unlimited)"
                />
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
  );
}
