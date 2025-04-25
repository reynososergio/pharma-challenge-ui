import { MedicationTypeRequest } from "@/types/medication-type";

export function sanitizeMedicationType(
  data: MedicationTypeRequest
): MedicationTypeRequest {
  return {
    name: data.name.trim(),
  };
}
