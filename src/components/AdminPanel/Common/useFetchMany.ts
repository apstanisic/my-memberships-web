import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { requestListData } from "src/store/resourcesSlice";
import { AppDispatch, RootState } from "src/store/store";
import { PaginationMetadata, WithId } from "src/types";
import { useUrls } from "./useUrls";

interface Props<T> {
  setIsLoading?: (newValue: boolean) => any;
  transform?: (data: any) => T;
  setResource: (val: any) => any;
}

export function useFetchMany<T extends WithId>({
  transform,
  setResource,
  setIsLoading,
}: Props<T>) {
  // const [resource, setResource] = useState<T[]>([]);
  const urls = useUrls();
  const dispatch: AppDispatch = useDispatch();
  // const [resources, setResource] = useState<T[]>([]);
  const [pg, setPg] = useState<PaginationMetadata>();
  const authInited = useSelector((state: RootState) => state.auth.isInited);
  const { search } = useLocation();
  const remoteUrl = urls.remoteBase();
  // const [isLoading, setIsLoading] = useState(false);
  const resourceName = urls.resourceName();
  const response = useSelector(
    (state: RootState) => state.resources.responsesFromGetMany[remoteUrl],
  );
  useEffect(() => {
    if (response) setResource(response.data);
  }, [response, setResource]);

  useEffect(() => {
    if (!authInited) return;
    dispatch(requestListData({ url: remoteUrl, resourceName }));
    // setIsLoading?.(true);
    // dataProvider
    //   .getMany<T>(remoteUrl, search)
    //   .then(res => {
    //     dispatch(addToResource({ data: res.data, resourceName }));
    //     const data = res.data.map(item => transform?.(item) ?? item);
    //     setResource(data);
    //     setPg(res.pagination);
    //     setIsLoading?.(false);
    //   })
    //   .catch(() => setIsLoading?.(false));
  }, [authInited, dispatch, remoteUrl, resourceName]);

  return { pg };
}
