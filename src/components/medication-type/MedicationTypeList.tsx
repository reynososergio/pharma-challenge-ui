import { useState } from "react";

import PaginatedTable from "@/components/table/PaginatedTable";

import { TableColProps } from "@/types/table";
import { MedicationFiltersRequest } from "@/types/medication";
import { usePaginatedQuery } from "@/hooks/usePaginatedData";

import Button from "react-bootstrap/Button";

import { PlusCircleFill, TrashFill } from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import {
  deleteMedicationType,
  getAllMedicationTypes,
} from "@/services/medication-type/medicationTypeService";

import { MedicationTypeData } from "@/types/medication-type";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { handleApiError } from "@/utils/handleApiError";
import { showToast } from "../toaster/Toaster";
import ConfirmationModal from "../modal/ConfirmationModal";

const MedicationTypeList = () => {
  const [filters] = useState<MedicationFiltersRequest>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [medicationTypeToDelete, setMedicationTypeToDelete] =
    useState<MedicationTypeData | null>(null);

  const navigate = useNavigate();

  const { data, totalPages, currentPage, setCurrentPage, isPending } =
    usePaginatedQuery<MedicationTypeData, MedicationFiltersRequest>({
      filters,
      fetchFn: getAllMedicationTypes,
    });

  const handleCreateMedicationType = () => {
    navigate(ROUTES.MEDICATION_TYPE.CREATE);
  };

  const handleDeleteClick = (med: MedicationTypeData) => {
    setMedicationTypeToDelete(med);
    setShowDeleteModal(true);
  };

  const confirmDeleteMedicationType = async () => {
    if (medicationTypeToDelete) {
      try {
        await deleteMedicationType(medicationTypeToDelete.id);
        showToast({
          type: "success",
          message: "Medication deleted successfully",
        });
        setCurrentPage(null);
        setTimeout(() => setCurrentPage(1), 0);
      } catch (error: unknown) {
        handleApiError(error, "Error deleting Medication type.");
      } finally {
        setShowDeleteModal(false);
        setMedicationTypeToDelete(null);
      }
    }
  };

  const columns: TableColProps<MedicationTypeData>[] = [
    {
      label: "Name",
      key: "name",
      render: (medicationType: MedicationTypeData) => medicationType.name,
    },
    {
      label: "Created At",
      key: "createdAt",
      render: (medication: MedicationTypeData) =>
        medication.createdAt
          ? (() => {
              const date = new Date(medication.createdAt);
              const datePart = date.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
              const timePart = date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              return `${datePart} - ${timePart}`;
            })()
          : "",
    },
    {
      label: "Actions",
      key: "actions",
      render: (med: MedicationTypeData) => (
        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
          <Button
            data-testid="delete-button"
            aria-label="Delete"
            variant="danger"
            size="sm"
            className="text-white"
            onClick={() => handleDeleteClick(med)}
          >
            <TrashFill size={16} />
          </Button>
        </OverlayTrigger>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Medication Type List</h2>
        <Button
          className="btn-challenge "
          variant="primary"
          onClick={handleCreateMedicationType}
        >
          <PlusCircleFill size={20} className="me-2" /> Create Medication Type
        </Button>
      </div>

      <PaginatedTable
        isPending={isPending}
        columns={columns}
        data={data}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this medication type?"
        onConfirm={confirmDeleteMedicationType}
      />
    </>
  );
};

export default MedicationTypeList;
