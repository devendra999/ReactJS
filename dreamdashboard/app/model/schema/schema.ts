import * as yup from "yup";

export const modelSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      name:  yup
      .string()
      .trim() 
      .min(2, 'Model Name must be at least 2 characters.')
      // .matches(/^[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+(\s[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+)*$/, 'Model name must contain only letters, numbers, and special characters, and spaces should not be at the beginning or end.')
      .required("This field is required."),
      dupModelName:  yup
      .string()
      .trim() 
      .min(2, 'Duplicate Model Name must be at least 2 characters.')
      .required("This field is required."),
      // .test("is-not-only-spaces", "Invalid value", (value) => {
      //   return value.trim() !== ""; 
      // }),
      brandId: yup
        .number()
        .typeError("This field is required")
        .required("This field is required"),
      pageCode: yup.string(),
      isActive: yup.boolean(),
    })
    .required();
