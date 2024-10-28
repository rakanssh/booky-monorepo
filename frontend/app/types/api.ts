export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface PaginationInfo {
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}
export interface PaginatedResponse<T> extends PaginationInfo {
  content: T[];
  pageable: Pageable;
  sort: Sort;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

export type PaginationParams = {
  page?: string;
  limit?: string;
};

export interface QueryParams extends PaginationParams {
  [key: string]: string | number | boolean | undefined;
}
