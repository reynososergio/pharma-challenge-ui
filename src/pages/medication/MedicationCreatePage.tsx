import MedicationCreate from "@/components/medication/MedicationCreate";
import MainLayout from "@/layouts/MainLayout";
import { getDrugTypes } from "@/services/drug-type/drugTypeTypeService";
import { getMedicationTypesLookup } from "@/services/medication-type/medicationTypeService";
import { SelectOptionResponse } from "@/types/base";
import { MedicationTypeData } from "@/types/medication-type";
import { useEffect, useState, useTransition } from "react";

const MedicationCreatePage = () => {
  const [isPending, startTransition] = useTransition();

  const [medicationTypeOptions, setMedicationTypeOptions] = useState<
    MedicationTypeData[]
  >([]);

  const [drugTypeOptions, setDrugTypeOptions] = useState<
    SelectOptionResponse[]
  >([]);

  useEffect(() => {
    fetchDataForm();
  }, []);

  const fetchDataForm = async () => {
    startTransition(async () => {
      const [medicationTypeOptionResponse, drugTypeOptionResponse] =
        await Promise.all([getMedicationTypesLookup(), getDrugTypes()]);

      setMedicationTypeOptions(medicationTypeOptionResponse.data);
      setDrugTypeOptions(drugTypeOptionResponse.data);
    });
  };

  return (
    <MainLayout title="Medication Create">
      <MedicationCreate
        isPending={isPending}
        medicationTypeOptions={medicationTypeOptions}
        drugTypeOptions={drugTypeOptions}
      />
    </MainLayout>
  );
};

export default MedicationCreatePage;
