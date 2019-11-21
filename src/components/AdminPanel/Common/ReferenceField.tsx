import { LinearProgress } from "@material-ui/core";
import React from "react";
import { useProvider } from "../useProvider";

interface Props {
  resourceName: string;
  resourceId: string;
  render: (val: any) => JSX.Element;
  rootResource?: boolean; // Resource is not nested inside company
  prefix?: string;
}

/** Give this field resource name and id, and it will render whateveryou want */
export function ReferenceField({ resourceName, resourceId, render }: Props) {
  const data = useProvider({ resourceName, resourceId });

  if (!data) {
    return (
      <div
        style={{ minHeight: 20, minWidth: 80 }}
        className="flex items-center"
      >
        <LinearProgress className="w-full" style={{ height: 5 }} />
      </div>
    );
  }

  return render(data);
}
