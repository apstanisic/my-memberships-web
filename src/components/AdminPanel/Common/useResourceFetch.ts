import { dataProvider } from "components/dataProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToResource } from "store/adminSlice";
import { AppDispatch, RootState } from "store/store";
import { useLocation } from "react-router-dom";
import { useUrls } from "./useUrls";
import { WithId, PaginationMetadata } from "types";

export function useResourceFetch<T extends WithId>({
  transform,
  setResource,
}: {
  transform?: (val: any) => T;
  setResource: (val: any) => any;
}) {
  const urls = useUrls();
  const dispatch: AppDispatch = useDispatch();
  // const [resources, setResource] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMetadata>();
  const authInited = useSelector((state: RootState) => state.auth.isInited);
  const { search } = useLocation();
  const remoteUrl = urls.remoteBase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authInited) return;
    setIsLoading(true);
    dataProvider
      .getMany<T>(remoteUrl, search)
      .then(res => {
        dispatch(addToResource({ data: res.data }));
        const data = res.data.map(item => transform?.(item) ?? item);
        setResource(data);
        setMeta(res.pagination);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [remoteUrl, dispatch, search, authInited, setResource, transform]);

  return { pagination: meta, isLoading };
}
