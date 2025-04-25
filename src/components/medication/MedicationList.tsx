import { useEffect, useState } from "react";

import FilterComponent from "@/components/filter/FilterComponent";
import PaginatedTable from "@/components/table/PaginatedTable";

import { TableColProps } from "@/types/table";
import { MedicationData, MedicationFiltersRequest } from "@/types/medication";
import { FilterConfig } from "@/types/filter";
import { usePaginatedQuery } from "@/hooks/usePaginatedData";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { PlusCircleFill } from "react-bootstrap-icons";

import { MedicationTypeData } from "@/types/medication-type";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { getMedicationTypesLookup } from "@/services/medication-type/medicationTypeService";

import { MEDICATION_TYPE_MAP } from "@/constants/medicationTypesMap";
import { handleApiError } from "@/utils/handleApiError";
import { getAllMedications } from "@/services/medication/medicationService";

const MedicationList = () => {
  const [filters, setFilters] = useState<MedicationFiltersRequest>({
    commercialName: "",
    type: "",
  });

  const [medicationTypes, setMedicationTypes] = useState<MedicationTypeData[]>(
    []
  );

  const navigate = useNavigate();

  const { data, totalPages, currentPage, setCurrentPage, isPending } =
    usePaginatedQuery<MedicationData, MedicationFiltersRequest>({
      filters,
      fetchFn: getAllMedications,
    });

  useEffect(() => {
    fetchDataFilter();
  }, []);

  const fetchDataFilter = async () => {
    try {
      const medicationTypes = await getMedicationTypesLookup();
      setMedicationTypes(medicationTypes.data as MedicationTypeData[]);
    } catch (error: unknown) {
      handleApiError(error, "Error fetching medication types");
    }
  };

  const handleCreateMedication = () => {
    navigate(ROUTES.MEDICATION.CREATE);
  };

  const columns: TableColProps<MedicationData>[] = [
    {
      label: "Code",
      key: "code",
      render: (medication: MedicationData) => medication.code,
    },
    {
      label: "Commercial Name",
      key: "commercialName",
      render: (medication: MedicationData) => medication.commercialName,
      align: "center",
    },
    {
      label: "Types",
      key: "type",
      render: (medication: MedicationData) => (
        <Badge
          pill
          className="badge-fixed"
          bg={
            (medication.type &&
              MEDICATION_TYPE_MAP[medication.type.name.toUpperCase()]) ||
            "secondary"
          }
        >
          {medication?.type?.name ?? ""}
        </Badge>
      ),
      align: "center",
    },
    {
      label: "Created At",
      key: "createdAt",
      render: (medication: MedicationData) =>
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
  ];

  const filterConfig: FilterConfig[] = [
    {
      name: "namePrefix",
      label: "Commercial Name",
      type: "text",
    },
    medicationTypes && {
      name: "typeId",
      label: "Types",
      type: "select",
      options: [
        { value: "", label: "All" },
        ...medicationTypes.map((medicationTypes) => ({
          value: medicationTypes.id,
          label: medicationTypes.name,
        })),
      ],
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Medication List</h2>
        <Button
          className="btn-challenge "
          variant="primary"
          onClick={handleCreateMedication}
        >
          <PlusCircleFill size={20} className="me-2" /> Create Medication
        </Button>
      </div>

      <FilterComponent
        filtersConfig={filterConfig}
        onFilterChange={setFilters}
      />

      <PaginatedTable
        isPending={isPending}
        columns={columns}
        data={data}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default MedicationList;
