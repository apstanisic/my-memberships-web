import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestListData } from "src/store/resourcesSlice";
import { AppDispatch, RootState } from "src/store/store";
import { PaginationMetadata, WithId } from "src/types";
import { useUrls } from "./useUrls";

interface Props<T> {
  setIsLoading?: (newValue: boolean) => any;
  transform?: (data: any) => T;
  setResource: (val: any) => any;
  setPg: (val: PaginationMetadata) => any;
}

/**
 * This hook reads url and fetches requested data.
 * It will call useUrls to get required info,
 * and read url query string for filtering and pagination
 * @param transform how do you like to transform your data on success
 *     (eg, class factory method)
 * @param setResource usually react state that data is kept.
 *     This hook is stateless, just get data from cache or sent new request
 * @param setIsLoading set when fetching data, and when done fetching
 */
export function useFetchMany<T extends WithId>({
  transform,
  setResource,
  setIsLoading,
  setPg,
}: Props<T>) {
  const dispatch: AppDispatch = useDispatch();
  const urls = useUrls();
  // const remoteUrl = urls.search();
  const remoteUrl = urls.remoteBase();
  const resourceName = urls.resourceName();
  const response = useSelector(
    (state: RootState) => state.resources.responsesFromGetMany[remoteUrl],
  );

  // Immidiatly set resource if it exist in cache
  useEffect(() => {
    if (response) {
      setResource(transform ? response.data.map(transform) : response.data);
      setPg(response.pagination);
    }
  }, [response, setResource, transform, setPg]);

  // Request new data, and let caching layer decide if we should get
  // updated results (wait timeout)
  useEffect(() => {
    // If there are no response data show loader (empty array is still data)
    setIsLoading?.(response === undefined);
    dispatch(requestListData({ url: remoteUrl, resourceName }));
  }, [dispatch, remoteUrl, resourceName, response, setIsLoading]);
}
