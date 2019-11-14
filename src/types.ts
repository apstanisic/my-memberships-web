export interface Image extends ImageSizes {
  id: string; // uuid
  position: number; // In case of storing image in array. Zero index
}

export interface ImageSizes {
  xs?: string; // 168px
  sm?: string; // 320px
  md?: string; // 640px
  lg?: string; // 1280px
}

export interface BaseEntity {
  id: UUID;
  createdAt: Date;
}

export interface WithId {
  id: UUID;
}

export type UUID = string;

export interface PaginationMetadata {
  amount: number; // number of results
  perPage: number; // limit per page
  isLastPage: boolean; // is this last page
  isFirstPage: boolean; // is this first page
  next?: string; // cursor for next page
  previous?: string; // cursor for previous page
}

export interface PaginationResult<T = any> {
  pagination: PaginationMetadata;
  /** Retrived data */
  data: T[];
}

export interface WithChildren {
  children?: any;
  [key: string]: any;
}
