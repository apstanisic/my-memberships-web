// in myRestProvider.js
import { parse, stringify } from "query-string";
import { http } from "src/core/http";
import { removeEmptyItems, Struct } from "src/core/utils/helpers";
import { PaginationResult, UUID, WithId } from "src/types";

interface Data<T = any> {
  data: T;
}
// type Data<T = any> = Promise<{ data: T }>;

type SearchType = string | Struct;

interface TempParams<T> {
  id?: UUID;
  data: T | Struct;
  method: "PUT" | "POST";
}

export function convertSearch(
  search: string | Struct | undefined,
  changeValue?: Struct,
): string {
  let searchQuery: Struct;
  if (typeof search !== "object") {
    searchQuery = parse(search ?? "");
    Object.entries(changeValue ?? {}).forEach(([key, value]) => {
      searchQuery[key] = value;
    });
    searchQuery = removeEmptyItems(searchQuery);
    if (Object.keys(searchQuery).length === 0) return "";
  } else {
    searchQuery = search;
  }
  return `?${stringify(searchQuery)}`;
}

// Do caching
function cacheGet<T>(path: string): Promise<T> {
  return http.get<T>(path).then(res => res.data);
}

export const dataProvider = {
  custom() {
    return http;
  },

  async getMany<T = any>(
    path: string,
    search?: SearchType,
  ): Promise<PaginationResult<T>> {
    const url = `${path}${convertSearch(search)}`;
    return cacheGet(url);
  },

  // Dont use search for now. If we fetch by id should we
  // accept search params?
  async getOneById<T = any>(
    path: string,
    params: { id: string; search?: any },
  ): Promise<T> {
    return cacheGet(`${path}/${params.id}`);
  },

  async getByIds<T = any>(
    resource: string,
    params: { ids: string[] },
  ): Promise<T[]> {
    // console.log("requested ", resource);
    // console.log(params.ids);

    const ids = params.ids.join(",");
    return cacheGet(`${resource}/ids?${stringify({ ids })}`);
  },

  async create<T = any>(
    resource: string,
    params: { data: Struct },
  ): Promise<Data<T>> {
    return http.post(resource, params.data);
  },

  async update<T extends WithId = any>(
    resource: string,
    params: { id?: UUID; data: T | Struct },
  ): Promise<Data<T>> {
    const id = params.id ?? params.data?.id;
    if (!id) throw new Error("No id provided");

    return http.put(`/${resource}/${id}`, params.data);
  },

  async createOrUpdate<T extends WithId = any>(
    resource: string,
    { data, method, id }: TempParams<T>,
  ): Promise<Data<T>> {
    id = id ?? data?.id;
    if (!id && method === "PUT") throw new Error("No id provided");
    const url = method === "POST" ? resource : `/${resource}/${id}`;

    return http({ url, method, data });
  },

  /** Params can either be id or object with params */
  async delete<T = any>(
    resource: string,
    params?: { id: UUID } | UUID,
  ): Promise<Data<T>> {
    let id: string = "";
    if (typeof params === "string") {
      id = `/${params}`;
    } else if (params?.id) {
      id = `/${params.id}`;
    }
    return http.delete(`${resource}${id}`);
  },
};
