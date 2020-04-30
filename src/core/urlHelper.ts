import { Company } from "src/components/AdminPanel/Company/Company";

export interface UrlParams {
  adminRoot: string;
  companyId?: string;
  company?: Company;
  resourceName: string;
  resourceId: string;
}

/**
 * Get urls for views. For example if we are at edit view
 * and want to go to show view, we will call resourcesUrl.show
 * with required params
 */
export const resourceUrls = {
  /** Root url for panel */
  panelRoot: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const adminRoot = custom?.adminRoot ?? url.adminRoot;
    const companyId = custom?.companyId ?? url.companyId;
    return `${adminRoot}/companies/${companyId}`;
  },

  /** Url for listing data from resource */
  list: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const resourceName = custom?.resourceName ?? url.resourceName;
    return `${resourceUrls.panelRoot(url, url)}/${resourceName}`;
  },

  /** Url to show form to create resource */
  create: (url: UrlParams, custom?: Partial<UrlParams>) => {
    return `${resourceUrls.list(url, custom)}/create`;
  },

  /** Url to show form to edit resource */
  edit: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const resourceId = custom?.resourceId ?? url.resourceId;
    return `${resourceUrls.list(url, custom)}/${resourceId}/edit`;
  },

  /** Url to show detailed resource */
  show: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const resourceId = custom?.resourceId ?? url.resourceId;
    return `${resourceUrls.list(url, custom)}/${resourceId}/show`;
  },

  /** Remote base resource */
  remoteResourceBase: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const resourceName = custom?.resourceName ?? url.resourceName;
    const companyId = custom?.companyId ?? url.companyId;
    return `companies/${companyId}/${resourceName}`;
  },

  /** Remote resource with id */
  remoteResourceItem: (url: UrlParams, custom?: Partial<UrlParams>) => {
    const resourceId = custom?.resourceId ?? url.resourceId;
    return `${resourceUrls.remoteResourceBase(url, custom)}/${resourceId}`;
  },
};
