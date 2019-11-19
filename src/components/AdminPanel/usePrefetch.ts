import { Http } from "core/http";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { urlHelper } from "store/adminSlice";
import { RootState } from "store/store";
import { WithId } from "types";
import { useUrls } from "./Common/useUrls";

const returnFunc = <T>(val: T) => val;

/**
 * This will send request to server to fetch new item,
 * and return current version from redux store if exist.
 * When user request detailed view we want them to have
 * latest version, but we will show them current version
 * In 99% of cases values are same.
 * @param transform is used to cast value to class instance
 * it does not have to do that, but it's better because
 * we can be sure that it parses value propertly
 */
export function useProvider<T extends WithId>(
  resourceName: string,
  transform: (val: T) => T = returnFunc,
) {
  const { resourceId } = useParams();
  const [resource, setResource] = useState<T>();
  const prefetched: T | undefined = useSelector(
    (state: RootState) =>
      state.admin.resources[resourceName]?.[resourceId ?? "not-existing"],
  );

  const { search } = useLocation();
  const resourceUrl = useUrls().remote();
  const path = resourceUrl + search;

  useEffect(() => {
    Http.get<T>(path).then(res => setResource(transform(res.data)));
  }, [path, transform]);

  if (prefetched && !resource) {
    setResource(transform(prefetched));
  }
  return resource;
}
