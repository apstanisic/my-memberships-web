import React from "react";
import { Link } from "@material-ui/core";

interface Props {
  email?: string;
  placeholder?: string;
}

/** Show link to send email to user */
export function EmailField({ email, placeholder }: Props) {
  if (!email) return <span>{placeholder ?? "No email provided"}</span>;
  return <Link href={`mailto:${email}`}>{email}</Link>;
}
