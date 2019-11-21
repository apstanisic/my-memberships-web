import React, { Fragment } from "react";

export function ShouldShow({
  show,
  children,
}: {
  show: boolean;
  children: any;
}) {
  return <Fragment>{show ? children : ""}</Fragment>;
}
