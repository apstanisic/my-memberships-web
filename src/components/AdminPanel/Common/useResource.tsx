import { useState } from "react";
import { PaginationMetadata, WithId } from "src/types";
import { useDeleteConfirmation } from "./useDeleteConfirmation";
import { useResourceDelete } from "./useResourceDelete";
import { useFetchMany } from "./useFetchMany";

interface Props<T> {
  setIsLoading?: (val: boolean) => any;
  transform?: (val: any) => T;
}

export function useResource<T extends WithId = any>({
  setIsLoading,
  transform,
}: Props<T>): [T[], { pg?: PaginationMetadata }] {
  const [resources, setResource] = useState<T[]>([]);
  const onDelete = useResourceDelete({ resources, setResource });
  const deleting = useDeleteConfirmation(onDelete);
  const { pg } = useFetchMany({ setIsLoading, transform, setResource });

  return [resources, { pg }];
}
