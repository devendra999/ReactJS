import * as yup from "yup";

export const userSchema = (isEdit: boolean) =>
  yup
    .object()
    .shape({
      fullName: yup
        .string()
        .trim()
        // .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'Full Name must contain only letters and spaces, and spaces should not be at the beginning or end.')
        .min(3, "Full Name must be at least 3 characters.")
        .required("Full Name is required."),
      username: !isEdit
        ? yup
            .string()
            .trim()
            // .test("is-not-only-spaces", "Invalid value", (value) => {
            //   return value.trim() !== "" && value.trim()[0] !== " "; // Check if the value is not only spaces
            // })
            .matches(
              /^[A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+([A-Za-z0-9!@#$%^&*()-_+=<>?/\|{}\[\],.`~'"';:]+)*$/,
              "Username must contain only letters, numbers, and special characters, and should not be at the beginning or end."
            )
            .required("This field is required.")
        : yup.string(),
      emailId: yup
        .string()
        .notRequired()
        .test("is-valid-email", "Invalid email", function (value) {
          if (!value) {
            return true; // Allow empty value
          }

          // Your custom email format validation logic
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return emailRegex.test(value);
        }),
      contactNumber: yup
        .string()
        .transform((originalValue, originalObject) => {
          if (typeof originalObject.contactNumber === "number") {
            return originalObject.contactNumber.toString();
          }
          return originalValue;
        })
        .notRequired()
        .matches(/^[0-9]*$/, "Phone number must contain only numbers.")
        // .min(10, "Minimum length is 10 characters")
        .max(15, "Maximum length is 15 characters"),
      address1: yup.string().trim().notRequired(),
      address2: yup.string().trim().notRequired(),
      city: yup.string().trim().notRequired(),
      state: yup.string().trim().notRequired(),
      country: yup.string().trim().notRequired(),
      pincode: yup
        .string()
        .transform((originalValue, originalObject) => {
          if (typeof originalObject.pincode === "number") {
            return originalObject.pincode.toString();
          }
          return originalValue;
        })
        .notRequired()
        .matches(/^[0-9]*$/, "ZipCode must contain only numbers.")
        // .min(4, "Minimum length is 4 characters")
        .max(10, "Maximum length is 10 characters"),
      password: !isEdit
        ? yup
            .string()
            .required("This field is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-])[A-Za-z\d@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-]{8,}$/,
              "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
            )
            .max(128, "Maximum length is 128 characters")
        : yup.string(),
      confirmPassword: !isEdit
        ? yup
            .string()
            .required("This field is required")
            .oneOf([yup.ref("password"), ""], "Passwords must match")
        : yup.string(),
      roleId: yup
        .number()
        .typeError("This field is required")
        .required("This field is required"),

      branches: yup
        .array()
        .of(yup.number())
        .min(1, "This field is required")
        .required("This field is required"),
      doj: yup.string(),
      dol: yup.string(),
      isActive: yup.boolean(),
    })
    .required();

export const changePasswordSchema = () =>
  yup
    .object()
    .shape({
      oldPassword: yup
        .string()
        // .trim() // Remove leading and trailing spaces
        .required("This field is required")
        .matches(/^\S+$/, "Old Password cannot contain blank spaces")
        .test("is-not-only-spaces", "Invalid value", (value) => {
          return value.trim() !== ""; // Check if the value is not only spaces
        }),
      newPassword: yup
        .string()
        .required("This field is required")
        // .notOneOf([yup.ref("oldPassword")], "Old Password and New Password must not match")
        .test(
          "not-match-old-password",
          "Old Password and New Password must not match",
          function (value) {
            return value !== this.parent.oldPassword;
          }
        )
        .test(
          "no-blank-spaces",
          "New Password cannot contain blank spaces",
          function (value) {
            return /^\S+$/.test(value);
          }
        )
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-])[A-Za-z\d@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-]{8,}$/,
          "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
        ),
      confirmPassword: yup
        .string()
        .required("This field is required")
        .test(
          "no-blank-spaces",
          "Confirm Password cannot contain blank spaces",
          function (value) {
            return /^\S+$/.test(value);
          }
        )
        .test(
          "match-new-password",
          "New Password and Confirm Password must match",
          function (value) {
            return value === this.parent.newPassword;
          }
        )
        .matches(/^\S+$/, "Confirm Password cannot contain blank spaces"),
      // .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
    })
    .required();

export const changePasswordModelSchema = () =>
  yup
    .object()
    .shape({
      newPassword: yup
        .string()
        .required("This field is required")
        // .notOneOf([yup.ref("oldPassword")], "Old Password and New Password must not match")
        // .test(
        //   "not-match-old-password",
        //   "Old Password and New Password must not match"
        //   // function (value) {
        //   //   return value !== this.parent.oldPassword;
        //   // }
        // )
        .test(
          "no-blank-spaces",
          "New Password cannot contain blank spaces",
          function (value) {
            return /^\S+$/.test(value);
          }
        )
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-])[A-Za-z\d@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-]{8,}$/,
          "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
        ),
      confirmPassword: yup
        .string()
        .required("This field is required")
        .test(
          "no-blank-spaces",
          "Confirm Password cannot contain blank spaces",
          function (value) {
            return /^\S+$/.test(value);
          }
        )
        .test(
          "match-new-password",
          "New Password and Confirm Password must match",
          function (value) {
            return value === this.parent.newPassword;
          }
        )
        .matches(/^\S+$/, "Confirm Password cannot contain blank spaces"),
      // .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
    })
    .required();
