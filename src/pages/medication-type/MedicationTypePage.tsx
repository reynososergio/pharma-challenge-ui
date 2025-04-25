import MedicationTypeList from "@/components/medication-type/MedicationTypeList";
import MainLayout from "@/layouts/MainLayout";

const MedicationTypePage = () => {
  return (
    <MainLayout title="Medication Type">
      <MedicationTypeList />
    </MainLayout>
  );
};

export default MedicationTypePage;
