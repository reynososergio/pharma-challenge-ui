import api from "@/api/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import { BaseFilterRequest } from "@/types/base";
import { MedicationTypeRequest } from "@/types/medication-type";

export const getMedicationTypesLookup = async () => {
  return await api.get(API_ENDPOINTS.MEDICATION_TYPE.LOOKUP);
};
export const getAllMedicationTypes = async (data: BaseFilterRequest) => {
  return await api.get(API_ENDPOINTS.MEDICATION_TYPE.ENTITY, { params: data });
};

export const createMedicationType = async (data: MedicationTypeRequest) => {
  return await api.post(`${API_ENDPOINTS.MEDICATION_TYPE.ENTITY}`, data);
};

export const deleteMedicationType = async (medicationTypeId: string) => {
  return await api.delete(
    `${API_ENDPOINTS.MEDICATION_TYPE.ENTITY}/${medicationTypeId}`
  );
};
