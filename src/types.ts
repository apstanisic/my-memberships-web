/** Type alias for hinting */
export type UUID = string;

/** Object must have id */
export interface WithId {
  id: UUID;
}

/** Base entity field */
export interface BaseEntity extends WithId {
  id: UUID;
  createdAt: Date;
}

export abstract class Resource {
  static NAME: string;
  static create: (val: any) => Resource;
}

/** Image sizes */
export interface ImageSizes {
  xs?: string; // 168px
  sm?: string; // 320px
  md?: string; // 640px
  lg?: string; // 1280px
}

/** Image in array of images */
export interface Image {
  id: UUID; // uuid
  position: number; // In case of storing image in array. Zero index
  sizes: ImageSizes;
}

/** Response from pagination request */
export interface PaginationResult<T = any> {
  pagination: PaginationMetadata;
  /** Retrived data */
  data: T[];
}

/** Pagination metadata from response */
export interface PaginationMetadata {
  amount: number; // number of results
  perPage: number; // limit per page
  isLastPage: boolean; // is this last page
  firstUrl?: string;
  lastUrl?: string;
  isFirstPage: boolean; // is this first page
  next?: string; // cursor for next page
  previous?: string;
  nextUrl?: string; // url for next page
  previousUrl?: string; // url for previous page
}

/** Props that accept children */
export interface WithChildren {
  children?: any;
  [key: string]: any;
}

export type Printable = string | React.ReactElement<any>;
