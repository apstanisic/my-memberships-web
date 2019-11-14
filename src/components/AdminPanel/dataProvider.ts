// in myRestProvider.js
import { AxiosRequestConfig } from "axios";
import { Http } from "core/http";
import { stringify } from "query-string";
import { Company } from "./Company/Company";
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
  async getList<T = any>(resource: string, params: any): Promise<any> {
    const filter = params.filter ? `?${stringify(params.filter)}` : "";
    const url = `${resource}${filter}`;

    const response = await Http.get<PaginationResult<T>>(url).then(
      res => res.data
    );

    const data = response.data.map(val => ({
      ...val,
      pagination: response.pagination
    }));

    // @ts-ignore

    // Just return any number for total, it does not metter.
    return { data, total: 1000 };
  },

  async getOne<T = any>(
    resource: string,
    params: { id: string }
  ): Promise<Data<T>> {
    return Http.request({ url: `${resource}/${params.id}` });
  },

  async getMany<T = any>(
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
    return Http.post(`${resource}`, params.data);
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
  },

  async deleteMany<T = any>(
    resource: string,
    params: { ids: string[] }
  ): Promise<Data<string[]>> {
    throw new Error("DP not done");
  },

  async updateMany<T = any>(
    resource: string,
    params: { ids: string[]; data: Struct }
  ): Promise<Data<string[]>> {
    throw new Error("DP not done");
  },

  async getManyReference<T = any>() {
    throw new Error("DP not done");
  }
};
