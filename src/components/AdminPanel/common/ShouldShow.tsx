import React, { Fragment } from "react";
import { WithChildren } from "src/types";

interface Props extends WithChildren {
  If: boolean;
}

/** Render children only if show is true
 * @example
 *  <ShouldShow show={someString === 'render'}></ShouldShow>
 */
export function Show({ If, children }: Props) {
  return <Fragment>{If ? children : ""}</Fragment>;
}
