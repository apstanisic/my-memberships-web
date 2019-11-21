import { dataProvider } from "components/dataProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useLocation } from "react-router-dom";
import { useUrls } from "./useUrls";
import { WithId, PaginationMetadata } from "types";
import { addToResource } from "store/resourcesSlice";

export function useResourceFetch<T extends WithId>({
  transform,
  setResource,
}: // urls,
// resourceName,
{
  transform?: (val: any) => T;
  setResource: (val: any) => any;
  // resourceName: string;
}) {
  const urls = useUrls();
  const dispatch: AppDispatch = useDispatch();
  // const [resources, setResource] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMetadata>();
  const authInited = useSelector((state: RootState) => state.auth.isInited);
  const { search } = useLocation();
  const remoteUrl = urls.remoteBase();
  const [isLoading, setIsLoading] = useState(false);
  const resourceName = urls.resourceName();

  useEffect(() => {
    if (!authInited) return;
    setIsLoading(true);
    dataProvider
      .getMany<T>(remoteUrl, search)
      .then(res => {
        dispatch(addToResource({ data: res.data, resourceName }));
        const data = res.data.map(item => transform?.(item) ?? item);
        setResource(data);
        setMeta(res.pagination);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [
    authInited,
    dispatch,
    remoteUrl,
    resourceName,
    search,
    setResource,
    transform,
  ]);

  return { pagination: meta, isLoading };
}
