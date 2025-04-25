import MedicationList from "@/components/medication/MedicationList";
import MainLayout from "@/layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout title="Home">
      <MedicationList />
    </MainLayout>
  );
};

export default HomePage;
