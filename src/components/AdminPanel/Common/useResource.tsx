import { useState } from "react";
import { PaginationMetadata, WithId } from "src/types";
import { useDeleteConfirmation } from "./useDeleteConfirmation";
import { useResourceDelete } from "./useResourceDelete";
import { useFetchMany } from "./useFetchMany";

// interface Props<T> {
// setIsLoading?: (val: boolean) => any;
// transform?: (val: any) => T;
// }
type Transform<T> = (val: any) => T;

interface ReturnObject<T> {
  data: T[];
  pg?: PaginationMetadata;
  onDelete: (row: WithId) => any;
  loading: {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => any;
  };
}

export function useResource<T extends WithId = any>(
  transform?: Transform<T>,
): ReturnObject<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setResource] = useState<T[]>([]);
  const [pg, setPg] = useState<PaginationMetadata>();
  const onDelete = useResourceDelete({ resources: data, setResource });
  const deleting = useDeleteConfirmation(onDelete);
  useFetchMany({ setIsLoading, transform, setResource, setPg });

  return {
    data,
    pg,
    loading: {
      isLoading,
      setIsLoading,
    },
    onDelete: deleting,
  };
}
