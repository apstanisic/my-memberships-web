import React, { Fragment } from "react";
import { ScaffoldAppBar } from "./AppBar";

export function AppScaffold({ children }: any) {
  return (
    <Fragment>
      <ScaffoldAppBar />
      {children}
    </Fragment>
  );
}
