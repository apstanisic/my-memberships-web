import { LinearProgress } from "@material-ui/core";
import React from "react";
import { useProvider } from "../useProvider";
import { WithId } from "src/types";

interface Props<T extends WithId = any> {
  resourceName: string;
  resourceId?: string;
  render: (val: T) => JSX.Element;
  rootResource?: boolean; // Resource is not nested inside company
  prefix?: string;
}

/** Give this field resource name and id, and it will render whateveryou want */
export function ReferenceField({ resourceName, resourceId, render }: Props) {
  const data = useProvider({ resourceName, resourceId, refetch: false });

  if (!data) {
    return (
      <div
        style={{ minHeight: 20, minWidth: 100 }}
        className="flex items-center"
      >
        <LinearProgress className="w-full" style={{ height: 5 }} />
      </div>
    );
  }

  return render(data);
}
