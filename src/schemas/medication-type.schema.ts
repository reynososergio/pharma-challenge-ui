import * as yup from "yup";

export const medicationTypeSchema = yup.object().shape({
  name: yup
    .string()
    .required("Medication type name is required")
    .max(40, "Medication type must be at most 40 characters"),
});
