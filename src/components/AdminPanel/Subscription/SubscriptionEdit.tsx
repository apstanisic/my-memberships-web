import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Switch,
  Toolbar,
} from "@material-ui/core";
import { Padding } from "src/components/common/Padding";
import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "../Common/Input/TextInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { Subscription } from "./Subscription";
import { DateInput } from "../Common/Input/DateInput";
import { SwitchInput } from "../Common/Input/SwitchInput";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "src/core/auth/User";
import { ShowViewItem } from "../Common/ShowViewItem";

export function SubscriptionEdit() {
  const [subscription, onSubmit, cancel] = useEditOrCreateView({
    transform: Subscription.create,
    method: "PUT",
  });

  return (
    <Formik
      initialValues={subscription ?? {}}
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
                  <span className="text-2xl mx-auto">Edit subscription</span>
                </Toolbar>
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
