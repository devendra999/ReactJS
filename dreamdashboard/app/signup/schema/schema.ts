import * as yup from "yup";

export const signUpSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .trim()
      // .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'Full Name must contain only letters and spaces, and spaces should not be at the beginning or end.')
      .min(3, "Full Name must be at least 3 characters.")
      .required("Full Name is required."),
    username: yup
          .string()
          .trim()
          // .test("is-not-only-spaces", "Invalid value", (value) => {
          //   return value.trim() !== "" && value.trim()[0] !== " "; // Check if the value is not only spaces
          // })
          .matches(
            /^[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+([A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+)*$/,
            "Username must contain only letters, numbers, and special characters, and should not be at the beginning or end."
          )
          .required("This field is required."),
    password: yup
          .string()
          .required("This field is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-])[A-Za-z\d@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-]{8,}$/,
            "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
          )
          .max(128, "Maximum length is 128 characters"),
    confirmPassword: yup
          .string()
          .required("This field is required")
          .oneOf([yup.ref("password"), ""], "Passwords must match"),
    roleId: yup
      .number()
      .typeError("This field is required")
      .required("This field is required"),
    brandId: yup
      .number()
      .typeError("This field is required")
      .required("This field is required"),
    branches: yup
      .array()
      .of(yup.number())
      .min(1, "This field is required")
      .required("This field is required"),
  })
  .required();
