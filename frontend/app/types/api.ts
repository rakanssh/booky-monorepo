export type ApiResponse<T> = {
  data: T;
  //TODO: Check this
  page: number;
  totalPages: number;
  totalItems: number;
};

export type PaginationParams = {
  page?: string;
  limit?: string;
};

export interface QueryParams extends PaginationParams {
  [key: string]: string | number | boolean | undefined;
}
