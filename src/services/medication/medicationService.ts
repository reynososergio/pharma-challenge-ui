import api from "@/api/api";
import { API_ENDPOINTS } from "@/config/endpoints";
import {
  MedicationFiltersRequest,
  MedicationRequest,
} from "@/types/medication";

export const getAllMedications = async (data: MedicationFiltersRequest) => {
  return await api.get(API_ENDPOINTS.MEDICATION.ENTITY, { params: data });
};

export const createMedication = async (data: MedicationRequest) => {
  return await api.post(`${API_ENDPOINTS.MEDICATION.ENTITY}`, data);
};
