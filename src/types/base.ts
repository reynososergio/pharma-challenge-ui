export interface BaseResponse {
  id: string;
  createdAt?: string;
}

export interface PaginatedResponse {
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface SelectOptionResponse {
  id: string;
  name: string;
}

export interface BaseSelect {
  value: string;
  label: string;
}

export interface BaseFilterRequest {
  pageSize?: number;
  page?: number;
}
