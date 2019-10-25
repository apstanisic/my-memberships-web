// in myRestProvider.js
import { AxiosRequestConfig } from "axios";
import { Http, PaginationResult } from "core/http";
import { stringify } from "query-string";
import {
  CREATE,
  DELETE,
  GET_LIST,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE
} from "react-admin/src";
import { Company } from "./Company/Company";

// /**
//  * Maps react-admin queries to my REST API
//  *
//  * @param {string} type Request type, e.g GET_LIST
//  * @param {string} resource Resource name, e.g. "posts"
//  * @param {Object} payload Request parameters. Depends on the request type
//  * @returns {Promise} the Promise for a data response
//  */
export async function dataProvider(
  type: string,
  resource: string,
  params: any
): Promise<any> {
  const options: AxiosRequestConfig = {};

  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: [field, order],
        range: [(page - 1) * perPage, page * perPage - 1],
        filter: params.filter
      };
      options.url = `${resource}?${stringify(query)}`;
      return Http.request<PaginationResult<Company>>(options).then(response => {
        const { data } = response.data;
        return { data, total: 33 };
      });
    }
    case GET_ONE:
      return Http.request({ url: `${resource}/${params.id}` }); //.then(res => res.data);
    // break;
    case CREATE:
      return Http.post(`${resource}`, params.data);
    case UPDATE:
      return Http.put(`${resource}/${params.id}`, params.data);
    case DELETE:
      return Http.delete(`${resource}/${params.id}`);
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: [field, order],
        range: [(page - 1) * perPage, page * perPage - 1],
        filter: {
          ...params.filter,
          [params.target]: params.id
        }
      };
      options.url = `${resource}?${stringify(query)}`;
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  console.log(options);
}
