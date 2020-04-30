import Axios from "axios";

/** Url for api requests */
export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
/** Url where files are stored */
const storageUrl = process.env.REACT_APP_STORAGE_URL || "https://my-subs-test.s3.fr-par.scw.cloud";

/** Http module with base url and some sane headers */
export const http = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * When fetching image or other files use this helper method.
 * Files stored in S3 wont be saved as absolute path. Base url
 * wont be saved for easier migration. Use this helper method
 * when wanting a file.
 * @param outside Should storage parse files that are not
 * in storage (enable http://test.com/ttt.jpg) to be parsed propertly
 * Enabled by default, user can desable if he/she only wants predefined
 */
export function storage(url: string, outside: boolean = true): string {
  if (url.startsWith("http") && outside) return url;
  const fileUrl = url.startsWith("/") ? url : `/${url}`;
  return `${storageUrl}${fileUrl}`;
}
