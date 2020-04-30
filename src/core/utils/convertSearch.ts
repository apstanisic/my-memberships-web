import { removeEmptyItems, Struct } from "./helpers";
import qs from "query-string";

/** Search query can either be string or object */
export type SearchType = string | Struct | undefined | null;

/** Convert Search type compatible object to query string */
export function convertSearch(search: SearchType, overridenValues: Struct = {}): string {
  let searchQuery: Struct = {};
  search = search ?? {};

  if (typeof search === "string") {
    searchQuery = qs.parse(search);
  }
  // Override some values
  Object.entries(overridenValues).forEach(([key, value]) => {
    searchQuery[key] = value;
  });

  // Remove empty items
  searchQuery = removeEmptyItems(searchQuery);

  // If there are no properties return empty string
  if (Object.keys(searchQuery).length === 0) return "";

  return `?${qs.stringify(searchQuery)}`;
}
