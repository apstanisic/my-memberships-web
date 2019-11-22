import {
  Box,
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
import { TextInput } from "../Common/Input/TextInput";
import { useEditView } from "../Common/useEditView";
import { Subscription } from "./Subscription";
import { DateInput } from "../Common/Input/DateInput";
import { SwitchInput } from "../Common/Input/SwitchInput";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "core/auth/User";
import { ShowViewItem } from "../Common/ShowViewItem";

export function SubscriptionEdit() {
  const [subscription, onSubmit, cancel] = useEditView(Subscription.create);
  console.log(subscription);

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
                <div style={{ minHeight: 60 }}>
                  <ReferenceField
                    resourceName="users"
                    resourceId={props.values?.ownerId}
                    render={(user: User) => (
                      <ShowViewItem
                        name={<h3 className="text-2xl">{user.name}</h3>}
                        val={<h3 className="text-2xl">{user.email}</h3>}
                        // secondary={user.email}
                      />
                    )}
                  />
                </div>
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
