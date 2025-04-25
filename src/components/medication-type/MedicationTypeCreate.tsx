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
import { MedicationTypeRequest } from "@/types/medication-type";
import { createMedicationType } from "@/services/medication-type/medicationTypeService";
import { MedicationTypeProps } from "../../types/medication-type";
import { medicationTypeSchema } from "@/schemas/medication-type.schema";

const MedicationTypeCreate = ({ isPending }: MedicationTypeProps) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(medicationTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: MedicationTypeRequest) => {
    try {
      await createMedicationType(data);

      showToast({
        type: "success",
        message: `Medication created successfully`,
      });
      navigate("/medication-type");
    } catch (error: unknown) {
      handleApiError(
        error,
        "Failed to create medication. Please try again later."
      );
    }
  };

  const handleBack = () => {
    const hasChanges = watch("name");

    if (!hasChanges) {
      navigate("/medication-type");
      return;
    }

    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    navigate("/medication-type");
  };

  if (isPending) return <Spinner />;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="form-group">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            placeholder="e.g., Amoxol"
            className={`input-challenge ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
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
            Create Medication type
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

export default MedicationTypeCreate;
