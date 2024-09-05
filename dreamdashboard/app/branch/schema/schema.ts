import * as yup from "yup";

export const branchSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      name:  yup
      .string()
      .trim() 
      .min(2, 'Branch Name must be at least 2 characters.')
      // .matches(/^[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+(\s[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+)*$/, 'Branch name must contain only letters, numbers, and special characters, and spaces should not be at the beginning or end.')
      .required("This field is required."),
      // .test("is-not-only-spaces", "Invalid value", (value) => {
      //   return value.trim() !== ""; 
      // }),
      duplicateName:  yup
      .string()
      .trim() 
      .min(2, 'Duplicate Name must be at least 2 characters.')
      .required("This field is required."),
      contactPerson: yup.string(),
      email: yup
      .string()
      .email("Invalid email format")
      .notRequired(),
      contactNumber: yup
      .string()
      .transform((originalValue, originalObject) => {
        // If the value is a number, convert it to a string
        if (typeof originalObject.contactNumber === "number") {
          return originalObject.contactNumber.toString();
        }
        return originalValue;
      })
      .notRequired()
      .matches(/^[0-9]*$/, "Phone number must contain only numbers.")
      // .min(10, "Minimum length is 10 characters")
      .max(15, "Maximum length is 15 characters"),
      address1: yup.string()
      .trim()
      .notRequired(),
      address2: yup.string()
      .trim()
      .notRequired(),
      city: yup.string()
      .trim()
      .notRequired(),
      state: yup.string()
      .trim()
      .notRequired(),
      country: yup.string()
      .trim()
      .notRequired(),
      pincode: yup
      .string()
      .transform((originalValue, originalObject) => {
        // If the value is a number, convert it to a string
        if (typeof originalObject.pincode === "number") {
          return originalObject.pincode.toString();
        }
        return originalValue;
      })
      .notRequired()
      .matches(/^[0-9]*$/, "ZipCode must contain only numbers.")
      // .min(4, "Minimum length is 4 characters")
      .max(10, "Maximum length is 10 characters"),
      brandId: yup
        .number()
        .typeError("This field is required")
        .required("This field is required"),
      isActive: yup.boolean(),
    })
    .required();

