import { Box, Button, Card, CardContent, Toolbar } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { User } from "src/core/auth/User";
import { DateInput } from "../common/input/DateInput";
import { SwitchInput } from "../common/input/SwitchInput";
import { TextInput } from "../common/input/TextInput";
import { ReferenceField } from "../common/ReferenceField";
import { ShowViewRow } from "../common/ShowViewItem";
import { useEditOrCreateView } from "../common/hooks/useEditOrCreateView";
import { Subscription } from "./Subscription";

export function SubscriptionEdit() {
  const { form } = useEditOrCreateView({
    transform: Subscription.create,
    method: "PUT",
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit}>
          <div>
            <Toolbar>
              <span className="text-2xl mx-auto">Edit subscription</span>
            </Toolbar>
            <div style={{ minHeight: 60 }}>
              <ReferenceField
                resourceName="users"
                resourceId={form.values?.ownerId}
                render={(user: User) => (
                  <ShowViewRow
                    name={<h3 className="text-2xl">{user.name}</h3>}
                    val={<h3 className="text-2xl">{user.email}</h3>}
                    // secondary={user.email}
                  />
                )}
              />
            </div>
            <SwitchInput name="active" form={form} label="Active" />
            <TextInput name="type" form={form} />
            <TextInput name="price" form={form} type="number" />
            <DateInput form={form} name="startsAt" label="Starts at" />
            <DateInput form={form} name="expiresAt" label="Expires at" />
            <TextInput
              name="allowedUses"
              form={form}
              type="number"
              label="AllowedUses (leave empty for unlimited)"
            />
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
        </form>
      </CardContent>
    </Card>
  );
}
