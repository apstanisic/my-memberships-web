import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { urlHelper } from "../../../store/adminSlice";

export function useUrls() {
  const url = useSelector((state: RootState) => state.admin.url);
  return {
    root: () => `${url.adminRoot}/companies/${url.companyId}`,
    list: () => `${urlHelper.root(url)}/${url.resourceName}`,
    create: () => `${urlHelper.list(url)}/create`,
    edit: (customId?: string) =>
      `${urlHelper.list(url)}/${customId ?? url.resourceId}/edit`,
    show: (customId?: string) =>
      `${urlHelper.list(url)}/${customId ?? url.resourceId}/show`,
    remoteBase: () => `/companies/${url.companyId}/${url.resourceName}`,
    remote: () => `${urlHelper.remoteBase(url)}/${url.resourceId}`,
    resourceName: () => url.resourceName,
  };
}
