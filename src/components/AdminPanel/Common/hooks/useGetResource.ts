import { useSelector } from "react-redux";
import { useObservable } from "react-use";
import { RootState } from "src/store/store";
import { cachedResourcesById } from "src/store/tempCache";
import { WithId } from "src/types";
import { useState, useEffect } from "react";

export function useGetResource<T extends WithId = WithId>(
  id?: string,
  resourceName?: string,
): T | undefined {
  //   const resources = useObservable(cachedResourcesById);
  const [resources, setRes] = useState();
  useEffect(() => {
    const s = cachedResourcesById.subscribe(setRes);

    return () => s.unsubscribe();
  }, []);
  const urls = useSelector((state: RootState) => state.admin.url);
  id = id ?? urls.companyId;
  resourceName = resourceName ?? urls.resourceName;
  const key = `${resourceName}/${id}`;

  //   return resources?.[key] as T | undefined;
  return resources?.get(key) as T | undefined;
}
