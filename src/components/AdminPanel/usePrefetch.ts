import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WithId } from "types";
import { RootState } from "store/store";
import { Http } from "core/http";

export function usePrefetch<T extends WithId>(
  resourceName: string,
  transform: (val: T) => T
) {
  const [resource, setResource] = useState<T>();
  const prefetched: T[] | undefined = useSelector(
    (state: RootState) => state.admin.resources[resourceName]
  );
  const { resourceId } = useParams();
  const path = useLocation().pathname;

  useEffect(() => {
    const url = path.replace("/admin-panel", "").replace("/show", "");
    Http.get<T>(url).then(res => setResource(transform(res.data)));
  }, [path, transform]);

  if (prefetched && !resource) {
    setResource(prefetched.find(item => item.id === resourceId));
  }
  return resource;
}
