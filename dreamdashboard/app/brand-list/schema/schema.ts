import * as yup from "yup";

export const brandSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      name:  yup
      .string()
      .trim() 
      .min(2, 'Brand Name must be at least 2 characters.')
      // .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'Brand name must contain only letters and spaces, and spaces should not be at the beginning or end.')
      .required("This field is required."),
      // .test("is-not-only-spaces", "Invalid value", (value) => {
      //   return value.trim() !== ""; 
      // }),
      isActive: yup.boolean(),
    })
    .required();



