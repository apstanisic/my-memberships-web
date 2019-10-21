import * as queryString from "query-string";

interface Options {
  ignore?: string | string[];
}

/* Wrapper function mainly because of need to ignore certain keys */
export function qsParse(toParse: string, { ignore }: Options = {}) {
  const parsed = queryString.parse(toParse) as Record<string, any>;
  if (typeof ignore === "string") {
    delete parsed[ignore];
  } else if (Array.isArray(ignore)) {
    ignore.forEach(toIgnore => delete parsed[toIgnore]);
  }
  return parsed;
}

/* Wrapper function mainly because of need to ignore certain keys */
/* For example, ignore page when doing new search */
export function qsStringify(
  obj: Record<string, any>,
  { ignore }: Options = {}
) {
  const toStringify = { ...obj };

  if (typeof ignore === "string") {
    delete toStringify[ignore];
  } else if (Array.isArray(ignore)) {
    ignore.forEach(toIgnore => delete toStringify[toIgnore]);
  }
  return queryString.stringify(toStringify);
}
