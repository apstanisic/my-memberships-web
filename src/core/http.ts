import Axios from "axios";

/** Url for api requests */
export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3030";
/** Url where files are stored */
const storageUrl = process.env.REACT_APP_STORAGE_URL || "";

/** Http module with base url and some sane headers */
export const Http = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

/**
 * When fetching image or other files use this helper method.
 * Files stored in S3 wont be saved as absolute path. Base url
 * wont be saved for easier migration. Use this helper method
 * when wanting a file.
 */
export function file(url: string): string {
  const fileUrl = url.startsWith("/") ? url : `/${url}`;
  return `${storageUrl}${fileUrl}`;
}

/** Pagination response */
// export interface PaginationResult<T = any> {
//   pagination: {
//     amount: number;
//     isLastPage: boolean;
//     startsAt?: string;
//     endsAt?: string;
//     next?: string;
//     previous?: string;
//     [key: string]: any;
//   };
//   data: T[];
// }
