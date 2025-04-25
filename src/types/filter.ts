import { MedicationFiltersRequest } from "./medication";

export interface FilterProps {
  filtersConfig: FilterConfig[];
  onFilterChange: (filters: MedicationFiltersRequest) => void;
}

export interface FilterConfig {
  colSize?: number;
  defaultValue?: string;
  name: string;
  label: string;
  type: "select" | "checkbox" | "text" | "date-range";
  options?: FilterSelectOption[];
}
export interface FilterSelectOption {
  value: string;
  label: string;
}
