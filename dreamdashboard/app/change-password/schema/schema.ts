import * as yup from "yup";

export const changePasswordSchema = () =>
  yup
    .object()
    .shape({
      password: yup.string()
            .required("This field is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-])[A-Za-z\d@$!%*?&!@#()_+={}\[\]|\\:;'"<>,.?/-]{8,}$/,
              "Password must contain at least one uppercase letter, lowercase letter, number, and special character"
            ),
      confirmPassword: yup.string()
            .required("This field is required")
            .oneOf([yup.ref("password"), ""], "Passwords must match"),
    })
    .required();

