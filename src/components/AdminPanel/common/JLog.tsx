import React, { Fragment } from "react";

/**
 * Simple temp helper to run function in jsx (JavaScript Log)
 * @Example
 *  <div>
 *    <JLog render={() => console.log(someValue)}/>
 *  <div>
 */
export function JLog({ render }: { render: () => any }) {
  render();
  return <Fragment></Fragment>;
}
