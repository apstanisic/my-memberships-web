import React from "react";
import { Link } from "@material-ui/core";

export function EmailField({ email }: { email?: string }) {
  if (!email) return <span>No email provided</span>;
  return <Link href={`mailto:${email}`}>{email}</Link>;
}
