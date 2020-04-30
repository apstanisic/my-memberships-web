import { useState } from "react";
import { PaginationMetadata, WithId } from "src/types";
import { useFetchMany } from "./useFetchMany";
import { useResourceDelete } from "./useResourceDelete";

type Transform<T> = (val: any) => T;

interface ReturnObject<Resource> {
  /** Data to be shown */
  data: Resource[];
  /** Pagination metadata */
  pg?: PaginationMetadata;
  /** Method to be called to delete resource */
  onDelete: (row: Resource | Resource[]) => Promise<void | Resource>;
  loading: {
    /** Is table data currently being fetched */
    isLoading: boolean;
    /** Change is loading */
    setIsLoading: (isLoading: boolean) => any;
  };
}

/**
 * This hook provide everything that is needed to populate table
 * @param transform Function that transforms POJO to class instance (or anything you want)
 */
export function useResource<T extends WithId = any>(transform?: Transform<T>): ReturnObject<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<T[]>([]);
  const [pg, setPg] = useState<PaginationMetadata>();
  const onDelete = useResourceDelete({ resources: resources, setResources });
  useFetchMany({ setIsLoading, transform, setResource: setResources, setPg });

  return {
    pg,
    data: resources,
    loading: {
      isLoading,
      setIsLoading,
    },
    onDelete,
  };
}
