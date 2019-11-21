import { useSelector } from "react-redux";
import { urlHelper } from "../../../store/adminSlice";
import { RootState } from "../../../store/store";

export function useUrls() {
  const url = useSelector((state: RootState) => state.admin.url);
  return {
    root: () => urlHelper.root(url),
    list: () => urlHelper.list(url),
    create: () => urlHelper.create(url),
    edit: (id?: string) => urlHelper.edit(url, id),
    remote: (resource?: string, id?: string) =>
      urlHelper.remote(url, resource, id),
    remoteBase: (resource?: string) => urlHelper.remoteBase(url, resource),
    resourceName: () => url.resourceName,
    show: (id?: string) => urlHelper.show(url, id),
    changeResource: (resource: string, id?: string) =>
      urlHelper.changeResource(url, resource, id),
    items: () => url,
  };
}
