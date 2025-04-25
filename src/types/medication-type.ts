import { BaseResponse } from "./base";

export interface MedicationTypeData extends BaseResponse {
  name: string;
  active: boolean;
}

export interface MedicationTypeRequest {
  name: string;
}

export interface MedicationTypeProps {
  isPending: boolean;
}
