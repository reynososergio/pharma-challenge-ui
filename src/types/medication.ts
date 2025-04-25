import {
  BaseFilterRequest,
  BaseResponse,
  PaginatedResponse,
  SelectOptionResponse,
} from "./base";
import { MedicationTypeData } from "./medication-type";

export interface MedicationFiltersRequest extends BaseFilterRequest {
  commercialName?: string;
  type?: string;
}

export interface MedicationRequest {
  code: number;
  commercialName: string;
  drug: string;
  typeId: number;
}

export interface MedicationResponse extends PaginatedResponse {
  medication: MedicationData;
}

export interface MedicationData extends BaseResponse {
  code: number;
  commercialName: string;
  drug: string;
  type: MedicationTypeData;
}

export interface MedicationProps {
  isPending: boolean;
  medicationTypeOptions: MedicationTypeData[];
  drugTypeOptions: SelectOptionResponse[];
}
