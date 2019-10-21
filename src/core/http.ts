import Axios from "axios";

export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
// const debugStorageUrl = 'http://storage.localhost';
// const b2Url = "https://f002.backblazeb2.com/file";
export const storageUrl = process.env.REACT_APP_STORAGE_URL || apiUrl;

export function addStoragePrefix(url: string) {
  return `${storageUrl}${url}`;
}

/** Http module with base url and some sane headers */
export const http = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

/** @todo set pagination type */
export interface PaginationResult<T = any> {
  pagination: Record<string, any>;
  data: T[];
}
