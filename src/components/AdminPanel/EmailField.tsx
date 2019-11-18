import React from "react";
import { Link } from "@material-ui/core";

export function EmailField({ email }: { email?: string }) {
  if (!email) return <span>Nema email</span>;
  return <Link href={`mailto:${email}`}>{email}</Link>;
}
