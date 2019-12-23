import React, { Fragment } from "react";

export function JLog({ render }: { render: () => any }) {
  render();
  return <Fragment></Fragment>;
}
