import api from "@/api/api";
import { API_ENDPOINTS } from "@/config/endpoints";

export const getDrugTypes = async () => {
  return await api.get(API_ENDPOINTS.DRUG_TYPES.LOOKUP);
};
