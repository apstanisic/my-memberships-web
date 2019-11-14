import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  EditButton,
  RichTextField,
  BooleanField,
  Datagrid,
  List,
  NumberField,
  FunctionField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  UrlField,
  DeleteButton
} from "react-admin";
import { Subscription } from "./Subscription";

const PostTitle = ({ record }: any) => {
  return <span>{record ? record.id : ""}</span>;
};

export function SubscriptionShow(props: any) {
  return (
    <Show title={<PostTitle />} {...props}>
      <SimpleShowLayout>
        {/* <TextField source="title" />
      <TextField source="teaser" />
      <RichTextField source="body" />
      <DateField label="Publication date" source="created_at" /> */}
        <BooleanField source="active" />
        <TextField source="type" />
        <DateField source="startsAt" />
        <DateField source="expiresAt" />
        <FunctionField
          label="Uses"
          textAlign="right"
          render={({ allowedUses, usedAmount }: Subscription) =>
            `${usedAmount} / ${allowedUses ? allowedUses : "∞"}`
          }
        />
        <NumberField source="price" />
        {/* <ArrivalsField source="arrivalIds" /> */}
      </SimpleShowLayout>
    </Show>
  );
}
