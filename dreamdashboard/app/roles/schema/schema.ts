import * as yup from "yup";

export const brandSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      name: yup
      .string()
      .trim() 
      .min(2, 'Role Name must be at least 2 characters.')
      // .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'Role name must contain only letters and spaces, and spaces should not be at the beginning or end.')
      .required("This field is required."),
      // .test("is-not-only-spaces", "Invalid value", (value) => {
      //   return value.trim() !== ""; 
      // }),
      roleCode : yup
      .string()
      // .trim() 
      .matches(/^[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+(\s[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+)*$/, 'Role Code must contain only letters, numbers, and special characters, and spaces should not be at the beginning or end.')
      .required("This field is required."),
      // .test("is-not-only-spaces", "Invalid value", (value) => {
      //   return value.trim() !== ""; 
      // }),
      canImport: yup.boolean(),
      manageDealer: yup.boolean(),
      isSuperAdmin: yup.boolean(),
      isActive: yup.boolean(),
      isDumpExportAllowed: yup.boolean(),
      isFileInvalidateAllowed: yup.boolean(),
      isFileExportAllowed: yup.boolean(),
      isChartExportAllowed: yup.boolean(),
      isDumpViewAllowed: yup.boolean(),
      isChartViewAllowed: yup.boolean()

    })
    .required();

