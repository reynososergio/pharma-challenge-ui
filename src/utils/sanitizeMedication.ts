import { MedicationRequest } from "@/types/medication";

export function sanitizeMedication(data: MedicationRequest): MedicationRequest {
  return {
    code: Number(data.code),
    commercialName: data.commercialName.trim(),
    drug: data.drug.trim(),
    typeId: Number(data.typeId),
  };
}
