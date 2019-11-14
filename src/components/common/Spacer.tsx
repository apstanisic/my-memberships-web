import React from "react";

export function Spacer({ height }: { height: number | string }) {
  return <div style={{ height, width: "100%" }}></div>;
}
