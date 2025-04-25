import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";

import { ROUTES } from "@/config/routes";
import MedicationCreatePage from "@/pages/medication/MedicationCreatePage";
import MedicationTypePage from "@/pages/medication-type/MedicationTypePage";
import MedicationTypeCreatePage from "@/pages/medication-type/MedicationTypeCreatePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<HomePage />} />

        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route
          path={ROUTES.MEDICATION.CREATE}
          element={<MedicationCreatePage />}
        />

        <Route
          path={ROUTES.MEDICATION_TYPE.LIST}
          element={<MedicationTypePage />}
        />

        <Route
          path={ROUTES.MEDICATION_TYPE.CREATE}
          element={<MedicationTypeCreatePage />}
        />

        <Route path={ROUTES.ALL} element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
