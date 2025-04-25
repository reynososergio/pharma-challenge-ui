import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { showToast } from "@/components/toaster/Toaster";

import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { handleApiError } from "@/utils/handleApiError";
import { MedicationProps, MedicationRequest } from "@/types/medication";
import { createMedication } from "@/services/medication/medicationService";
import { medicationSchema } from "@/schemas/medication.schema";

const MedicationCreate = ({
  isPending,
  medicationTypeOptions,
  drugTypeOptions,
}: MedicationProps) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(medicationSchema),
    defaultValues: {
      code: NaN,
      commercialName: "",
      drug: "",
      typeId: NaN,
    },
  });

  const onSubmit = async (data: MedicationRequest) => {
    try {
      await createMedication(data);

      showToast({
        type: "success",
        message: `Medication created successfully`,
      });
      navigate("/medication");
    } catch (error: unknown) {
      handleApiError(
        error,
        "Failed to create medication. Please try again later."
      );
    }
  };

  const handleBack = () => {
    const hasChanges =
      watch("code") ||
      watch("commercialName") ||
      watch("drug") ||
      watch("typeId");

    if (!hasChanges) {
      navigate("/medication");
      return;
    }

    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    navigate("/medication");
  };

  if (isPending) return <Spinner />;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="form-group">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="number"
            {...register("code")}
            placeholder="Medication code"
            className={`input-challenge ${errors.code ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.code?.message}</div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Commercial Name</Form.Label>
          <Form.Control
            type="text"
            {...register("commercialName")}
            placeholder="e.g., Amoxol"
            className={`input-challenge ${
              errors.commercialName ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.commercialName?.message}
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Drug</Form.Label>
          <Form.Select
            {...register("drug")}
            className={`input-challenge ${errors.drug ? "is-invalid" : ""}`}
          >
            <option value="">Select drugtype</option>
            {drugTypeOptions.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
          <div className="invalid-feedback">{errors.drug?.message}</div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Medication Type</Form.Label>
          <Form.Select
            {...register("typeId")}
            className={`input-challenge ${errors.typeId ? "is-invalid" : ""}`}
          >
            <option value="">Select a type</option>
            {medicationTypeOptions.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
          <div className="invalid-feedback">{errors.typeId?.message}</div>
        </Form.Group>

        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="secondary"
            onClick={handleBack}
            data-testid="back-button"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="btn-challenge"
            data-testid="submit-button"
          >
            Create Medication
          </Button>
        </div>
      </Form>

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave?"
        onConfirm={confirmExit}
      />
    </>
  );
};

export default MedicationCreate;
