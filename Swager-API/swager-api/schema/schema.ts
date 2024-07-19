import * as yup from "yup";

export const claimSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      name: yup
        .string()
        .trim()
        .min(2, "Claim Name must be at least 2 characters.")
        .required("This field is required."),
      productId: yup
        .number()
        .typeError("This field is required")
        .required("This field is required"),
    })
    .required();
