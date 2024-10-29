import { ErrorResponse, QueryParams } from "../types/api";

const API_BASE_URL = process.env.API_URL ?? "http://backend:8080";

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  params?: QueryParams
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}${buildQueryString(params)}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    throw new Error(((await response.json()) as ErrorResponse).message);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, params?: QueryParams) =>
    fetchApi<T>(endpoint, {}, params),
  post: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  patch: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, {
      method: "DELETE",
    }),
};

function buildQueryString(params?: QueryParams): string {
  if (!params) return "";

  return `?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
}
