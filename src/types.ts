// This file contains some common types that are used throughout the app

/** Simple type alias to clarify that it's a UUID */
export type UUID = string;

/** Object with id. Every entity in db must have id */
export interface WithId {
  id: UUID;
}

/** Base entity field */
export interface BaseEntity extends WithId {
  id: UUID;
  createdAt: Date;
  // For caching
  fetchedAt?: Date;
}

/**
 * Resource base class.
 * Examples of resource: Subscription, Arrivals, etc.
 */
export abstract class Resource {
  /** Name of resource */
  static NAME: string;

  /** Method to create given resource from plain object */
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
export interface Image extends BaseEntity {
  position?: number; // In case of storing image in array. Zero index
  prefix: string;
  original?: string;
  // Sizes
  xs: string; // This size always exist (thumbnail)
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

/** Response from pagination request */
export interface PaginationResult<T extends WithId = any> {
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

/** Any value that react know how to write on screen */
export type Printable = string | React.ReactElement<any>;


