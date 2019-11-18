// in myRestProvider.js
import { AxiosRequestConfig } from "axios";
import { Http } from "core/http";
import { stringify } from "query-string";
import { Struct } from "core/utils/helpers";
import { PaginationResult } from "types";

interface Data<T = any> {
  data: T;
}
// type Data<T = any> = Promise<{ data: T }>;

export const dataProvider = {
  /**
   * Response object must be this stupid. So merge pagination metadata
   * with every item. When merging with only first, sometimes it does
   * not show cause it converts array to object where id is key.
   */
  async getList<T = any>(
    path: string,
    params: any
  ): Promise<PaginationResult<T>> {
    const filter = params.filter ? `?${stringify(params.filter)}` : "";
    const url = `${path}${filter}`;

    return Http.get<PaginationResult<T>>(url).then(res => res.data);
  },

  async getOne<T = any>(
    resource: string,
    params: { id: string }
  ): Promise<Data<any>> {
    let path = resource.replace("/admin-panel", "");
    // if (path.endsWith('/show')) {
    //   path = path.replace('/show', '');
    // }
    // if (path.endsWith('/edit')) {
    //   path = path.replace('/edit', '');
    // }

    return Http.request({ url: `${path}/${params.id}` });
  },
  async getByIds<T = any>(
    resource: string,
    params: { ids: string[] }
  ): Promise<Data<T[]>> {
    const ids = (params.ids as string[]).join(",");
    return Http.get(`${resource}/ids?${stringify({ ids })}`);
  },

  async create<T = any>(
    resource: string,
    params: { data: Struct }
  ): Promise<Data<T>> {
    return Http.post(resource, params.data);
  },

  async update<T = any>(
    resource: string,
    params: { id: string; data: Struct; previousData: Struct }
  ): Promise<Data<T>> {
    return Http.put(`${resource}/${params.id}`, params.data);
  },

  async delete<T = any>(
    resource: string,
    params: { id: string; previousData: Struct }
  ): Promise<Data<T>> {
    return Http.delete(`${resource}/${params.id}`);
  }
};
