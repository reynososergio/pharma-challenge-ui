import MedicationTypeCreate from "@/components/medication-type/MedicationTypeCreate";
import MainLayout from "@/layouts/MainLayout";

const MedicationTypeCreatePage = () => {
  return (
    <MainLayout title="Medication Type Create">
      <MedicationTypeCreate isPending={false} />
    </MainLayout>
  );
};

export default MedicationTypeCreatePage;
