export type Id = string;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  city: string;
  area: string;
  pincode?: string;
  fullAddress?: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption = "recommended" | "rating_desc" | "price_asc" | "experience_desc";

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
