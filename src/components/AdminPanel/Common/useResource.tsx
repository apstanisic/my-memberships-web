import { Column, MaterialTableProps } from "material-table";
import { useState } from "react";
import { WithId } from "types";
import { useTableConfig } from "../useTableConfig";
import { useDelete } from "./useDelete";
import { useResourceDelete } from "./useResourceDelete";
import { useResourceFetch } from "./useResourceFetch";

interface ConfigOptions<T extends object>
  extends Omit<Partial<MaterialTableProps<T>>, "data"> {
  data: T[];
}

type Return<T extends object> = [
  T[],
  {
    edit: (row: any) => any;
    create: (row: any) => any;
    show: (row: any) => any;
    isLoading: boolean;
    onDelete: (rows: WithId | WithId[]) => Promise<any>;
    config: ConfigOptions<T>;
    CustomActions: Column<T>;
    alertDialog: JSX.Element;
  },
];

export function useResource<T extends WithId = any>(
  transform?: (val: any) => T,
): Return<T> {
  const [resources, setResource] = useState<T[]>([]);
  const onDelete = useResourceDelete({ resources, setResource });
  const deleting = useDelete(onDelete);
  const { pagination, isLoading } = useResourceFetch<T>({
    setResource,
    transform,
  });

  const tableConfig = useTableConfig<T>({ deleting, pagination });

  const config: ConfigOptions<T> = {
    ...tableConfig.config,
    isLoading,
    data: resources,
  };

  return [
    resources,
    {
      ...tableConfig.navigate,
      // show: tableConfig.navigate.show
      isLoading,
      config,
      onDelete,
      CustomActions: tableConfig.custom,
      alertDialog: deleting.alert,
    },
  ];
}
