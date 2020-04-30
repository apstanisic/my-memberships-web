import { useSelector } from "react-redux";
// import { resourceUrls } from "../../../store/adminSlice";
import { RootState } from "../../../../store/store";
import { useLocation } from "react-router-dom";
import { resourceUrls, UrlParams } from "src/core/urlHelper";

export function useUrls() {
  const { search } = useLocation();
  const url = useSelector((state: RootState) => state.admin.url);

  return {
    panelRoot: (custom?: Partial<UrlParams>) => resourceUrls.panelRoot(url, custom),
    list: (custom?: Partial<UrlParams>) => resourceUrls.list(url, custom),
    show: (custom?: Partial<UrlParams>) => resourceUrls.show(url, custom),
    create: (custom?: Partial<UrlParams>) => resourceUrls.create(url, custom),
    edit: (custom?: Partial<UrlParams>) => resourceUrls.edit(url, custom),
    remoteItem: (custom?: Partial<UrlParams>) => resourceUrls.remoteResourceItem(url, custom),
    remoteBase: (custom?: Partial<UrlParams>) => resourceUrls.remoteResourceBase(url, custom),
    addSearch: (url: string, search?: string) => `${url}?${search}`,
    resourceName: (custom?: Partial<UrlParams>) => url.resourceName,
    items: (custom?: Partial<UrlParams>) => url,
  };
}
