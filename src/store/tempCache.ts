import { BehaviorSubject } from "rxjs";
import { PaginationResult, WithId } from "src/types";
import { Struct } from "src/core/utils/helpers";

const pages = new Map<string, PaginationResult<WithId>>();
const ids = new Map<string, WithId>();
// const ids: Struct<WithId> = {};
export const tempCache = { pages, ids };

export const cachedResourcesById = new BehaviorSubject(ids);
export const cachedResourcePages = new BehaviorSubject(pages);

// cachedResourcesById.subscribe(console.log);
