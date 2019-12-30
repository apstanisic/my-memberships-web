import { Box, Button, Card, CardContent, Toolbar } from "@material-ui/core";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { DateInput } from "../Common/Input/DateInput";
import { ReferenceSelectInput } from "../Common/Input/ReferenceSelectInput";
import { SelectInput } from "../Common/Input/SelectInput";
import { SwitchInput } from "../Common/Input/SwitchInput";
import { TextInput } from "../Common/Input/TextInput";
import { useEditOrCreateView } from "../Common/useEditOrCreateView";
import { Subscription } from "./Subscription";

export function SubscriptionCreate() {
  let subscriptionTypes = useSelector(
    (state: RootState) => state.admin.settings?.config?.subscription?.types,
  );

  subscriptionTypes = {
    ...subscriptionTypes,
    special: {
      duration: 1,
      durationUnit: "month",
      name: "special",
      price: 100,
      allowedUses: 31,
    },
  };

  // const subTypeNames = Object.values(subscriptionTypes ?? {}).map(
  //   val => val.name,
  // );

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

                <SelectInput
                  name="type"
                  form={props}
                  options={Object.values(subscriptionTypes ?? {}).map(
                    t => t.name,
                  )}
                  label="Type"
                  onChangeHook={val => {
                    const sub = Object.values(subscriptionTypes ?? {}).filter(
                      t => t.name === val,
                    )[0];
                    if (sub) {
                      const expires = dayjs(props.values.startsAt)
                        .add(sub.duration, sub.durationUnit as any)
                        .subtract(1, "day");
                      props.setFieldValue("price", sub.price);
                      props.setFieldValue("allowedUses", sub.allowedUses);
                      props.setFieldValue("expiresAt", expires.toDate());
                    }
                  }}
                />
                <TextInput name="price" form={props} type="number" />
                <DateInput form={props} name="startsAt" label="Starts at" />
                <DateInput form={props} name="expiresAt" label="Expires at" />
                <TextInput
                  name="allowedUses"
                  form={props}
                  type="number"
                  label="Allowed Uses (leave empty for unlimited)"
                />
                <SwitchInput name="active" form={props} label="Active" />
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
