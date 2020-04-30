import { Box, Button, Card, CardContent, Toolbar } from "@material-ui/core";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { DateInput } from "../common/input/DateInput";
import { ReferenceSelectInput } from "../common/input/ReferenceSelectInput";
import { SelectInput } from "../common/input/SelectInput";
import { SwitchInput } from "../common/input/SwitchInput";
import { TextInput } from "../common/input/TextInput";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
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

  const { form } = useEditOrCreateView({
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
    <Card>
      <CardContent>
        <Form>
          <div>
            <Toolbar>
              <Box className="text-2xl mx-auto">Add subscription</Box>
            </Toolbar>
            <ReferenceSelectInput
              freeSoloField="ownerEmail"
              form={form}
              label="User"
              fieldToShow="email"
              idField="ownerId"
              resourceName="subscriptions/users"
            />

            <SelectInput
              name="type"
              form={form}
              options={Object.values(subscriptionTypes ?? {}).map(t => t.name)}
              label="Type"
              onChangeHook={val => {
                const sub = Object.values(subscriptionTypes ?? {}).filter(t => t.name === val)[0];
                if (sub) {
                  const expires = dayjs(form.values.startsAt)
                    .add(sub.duration, sub.durationUnit as any)
                    .subtract(1, "day");
                  form.setFieldValue("price", sub.price);
                  form.setFieldValue("allowedUses", sub.allowedUses);
                  form.setFieldValue("expiresAt", expires.toDate());
                }
              }}
            />
            <TextInput name="price" form={form} type="number" />
            <DateInput form={form} name="startsAt" label="Starts at" />
            <DateInput form={form} name="expiresAt" label="Expires at" />
            <TextInput
              name="allowedUses"
              form={form}
              type="number"
              label="Allowed Uses (leave empty for unlimited)"
            />
            <SwitchInput name="active" form={form} label="Active" />
          </div>

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
        </Form>
      </CardContent>
    </Card>
  );
}
