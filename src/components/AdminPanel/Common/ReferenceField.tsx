import { LinearProgress } from "@material-ui/core";
import React from "react";
import { useProvider } from "../useProvider";

interface Props {
  resourceName: string;
  id: string;
  // store: Record<string, any[]>;
  render: (val: any) => JSX.Element;
  rootResource?: boolean; // Resource is not nested inside company
  prefix?: string;
}

/**
 * Store is object where keys are resoure names
 * Every resource name is an object where keys are
 * entity id, and value is object with 2 fields
 * First is id where we have entity id again.
 * Second is callback function to be called when
 * data is fetched
 */

export function ReferenceField({
  resourceName,
  id,
  render,
  rootResource,
  prefix,
}: Props) {
  const data = useProvider({
    resourceName,
    rootResource,
    prefix,
    resourceId: id,
    refetch: false,
  });

  if (!data)
    return (
      <div style={{ minHeight: 20 }}>
        <LinearProgress className="w-full" style={{ height: 5 }} />
      </div>
    );
  return render(data);
}
