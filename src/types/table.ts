import { JSX } from "react";

export interface TableColProps<T> {
  label: string;
  key: keyof T | "actions";
  align?: "left" | "center" | "right";
  render: (row: T) => JSX.Element | string | number | null;
}

export interface PaginatedTableProps<T> {
  isPending: boolean;
  columns: TableColProps<T>[];
  data: T[];
  totalPages: number;
  currentPage: number | null;
  onPageChange: (page: number) => void;
}
