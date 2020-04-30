// in myRestProvider.js
import { stringify } from "query-string";
import { http } from "src/core/http";
import { convertSearch, SearchType } from "src/core/utils/convertSearch";
import { Struct } from "src/core/utils/helpers";
import { PaginationResult, UUID, WithId } from "src/types";

interface Data<T = any> {
  data: T;
}

interface CreateOrUpdateParams<T extends WithId> {
  resource: string; // companies/f21f/arrivals
  id?: UUID; // 9vjs
  data: T | Struct; // { seen: true }
  method: "PUT" | "POST";
}

/**
 * Fetch data and cache result.
 * Currently it's only fetching.
 */
async function getAndCache<T>(path: string): Promise<T> {
  const { data } = await http.get<T>(path);
  return data;
}

/**
 * Object with all method and rules for fetching data from api
 */
export const dataProvider = {
  /**
   * If no method is apropriate, you can get http instance
   */
  custom() {
    return http;
  },

  /** Get paginated list */
  async getMany<T extends WithId = any>(
    path: string,
    search?: SearchType,
  ): Promise<PaginationResult<T>> {
    const url = `${path}${convertSearch(search)}`;
    return getAndCache(url);
  },

  /** Get resource by id */
  async getOneById<T = any>(path: string, params: { id: string; search?: SearchType }): Promise<T> {
    return getAndCache(`${path}/${params.id}${convertSearch(params.search)}`);
  },

  /** Get many resources by their id */
  async getByIds<T = any>(
    resource: string,
    params: { ids: string[]; search?: SearchType },
  ): Promise<T[]> {
    const ids = params.ids.join(",");
    const query = convertSearch(params.search, { ids });

    return getAndCache(`${resource}/ids${query}`);
  },

  /** Create resource */
  async create<T = any>(resource: string, params: { data: Struct }): Promise<Data<T>> {
    return http.post(resource, params.data);
  },

  /** Update resource */
  async update<T extends WithId = any>(
    resource: string,
    params: { id?: UUID; data: T | Struct },
  ): Promise<Data<T>> {
    const id = params.id ?? params.data?.id;
    if (!id) throw new Error("No id provided");

    return http.put(`/${resource}/${id}`, params.data);
  },

  /** This will either update or create resource @Todo make this more clear */
  async createOrUpdate<T extends WithId = any>({
    data,
    method,
    id,
    resource,
  }: CreateOrUpdateParams<T>): Promise<Data<T>> {
    // Take id from data if id not specificly provided
    id = id ?? data?.id;
    // If there is no id, request can not be put
    if (!id && method === "PUT") throw new Error("For updating, id must be provided.");
    // If request is post, ignore id, othervise use it
    const url = method === "POST" ? resource : `/${resource}/${id}`;

    return http({ url, method, data });
  },

  /** Delete resource. User can provide string himself or pass id seperatly to be concatinated */
  async delete<T = any>(resource: string, params?: { id: UUID }): Promise<Data<T>> {
    if (!params) {
      return http.delete(resource);
    }
    return http.delete(`${resource}/${params.id}`);
  },
};
