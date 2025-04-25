import * as yup from "yup";

export const medicationSchema = yup.object().shape({
  code: yup
    .number()
    .typeError("Code must be a number")
    .required("Code is required")
    .positive("Code must be a positive number")
    .integer("Code must be an integer")
    .max(2147483647, "Code must be less than or equal to 2,147,483,647"),

  commercialName: yup
    .string()
    .required("Commercial name is required")
    .max(40, "Commercial name must be at most 40 characters"),

  drug: yup
    .string()
    .required("Drug is required")
    .max(100, "Drug name must be at most 100 characters"),

  typeId: yup
    .number()
    .typeError("Type is required")
    .required("Type is required")
    .moreThan(0, "Type must be selected"),
});
