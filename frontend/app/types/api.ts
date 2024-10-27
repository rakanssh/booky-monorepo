export type ApiResponse<T> = {
  data: T;
  //TODO: Check this
  page: number;
  totalPages: number;
  totalItems: number;
};
