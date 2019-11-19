import {
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Switch,
} from "@material-ui/core";
import { Padding } from "components/common/Padding";
import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "../Common/TextInput";
import { useEdit } from "../Common/useEdit";
import { Subscription } from "./Subscription";
import { DateInput } from "../Common/DateInput";
import { SwitchInput } from "../Common/SwitchInput";

export function SubscriptionEdit() {
  const [subscription, onSubmit, cancel] = useEdit(Subscription.create);
  console.log(subscription);

  return (
    <Formik
      initialValues={subscription || {}}
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
                <SwitchInput name="active" form={props} label="Active" />
                <TextInput name="type" form={props} />
                <TextInput name="price" form={props} type="number" />
                <DateInput form={props} name="startsAt" label="Starts at" />
                <DateInput form={props} name="expiresAt" label="Expires at" />
                <TextInput
                  name="allowedUses"
                  form={props}
                  type="number"
                  label="AllowedUses (leave empty for unlimited)"
                />
              </div>

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
