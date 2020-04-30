import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { requestDataById } from "src/store/resourcesSlice";
import { RootState } from "src/store/store";
import { UUID, WithId } from "src/types";
import { useGetResource } from "./useGetResource";
import { useUrls } from "./useUrls";

interface UPProps<T> {
  resourceName?: string;
  resourceId?: string;
  transform?: (val: any) => T; // maybe cast to object if you want
  refetch?: boolean; // Do we want new value or is value from store okay
  rootResource?: boolean; // not used currently (useful when want /user/fdf)
  prefix?: string; // not used currently (useful when want /auth/user)
}

/**
 * This will send request to server to fetch new item,
 * and return current version from redux store if exist.
 * When user request detailed view we want them to have
 * latest version, but we will show them current version
 * while we fetch new in the background
 * In 99% of cases values are same.
 */
export function useProvider<T extends WithId>(props: UPProps<T>) {
  const dispatch = useDispatch();
  const params = useParams<{ resourceId?: string }>();
  const urls = useUrls();
  const resourceId = props.resourceId ?? params.resourceId;
  const resourceName = props.resourceName ?? urls.items().resourceName;
  const refetch = props.refetch ?? true;
  // @TODO Hack, fix this somehow. Works great for now
  const [requestSent, setRequestSent] = useState<Record<UUID, boolean>>({});

  const isInited = useSelector((state: RootState) => state.auth.isInited);

  // const resource: T | undefined = useSelector(
  //   (state: RootState) =>
  //     state.resources.resources[resourceName]?.[resourceId ?? "null"],
  // );
  const resource = useGetResource<T>(resourceId, resourceName);

  // Stop if:
  // we already have resource, and we  don't want latest copy
  // we do not have resource id provided
  // request is already sent
  useEffect(() => {
    if ((!refetch && resource) || !resourceId || requestSent[resourceId] || !isInited) return;
    setRequestSent({ ...requestSent, [resourceId]: true });
    dispatch(requestDataById({ resourceName, resourceId }));
  }, [dispatch, isInited, refetch, requestSent, resource, resourceId, resourceName]);

  if (!resource) return resource;
  return props.transform ? props.transform(resource) : resource;
}
