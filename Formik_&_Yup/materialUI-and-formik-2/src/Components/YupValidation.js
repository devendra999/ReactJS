import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export default YupValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, "Too Short !")
    .max(30, "Too Long !")
    .required("Required !"),

  email: yup.string().email("Enter a Vaid Email").required("Email is Required"),

  password: yup
    .string()
    .required("Enter Your Password")
    .matches(PasswordRegEx, "Uppercase Lowercase Special char Required")
    .min(8, "Password Should be minimum 8 character")
    .max(50, "Too long"),

  phoneNumber: yup
    .string()
    .matches(phoneNumberRegEx, "Invalid Phone Number")
    .max(11, "Invalid Phone Number")
    .required("Required !"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not matched")
    .required("Confirm Password is Required"),

  image: yup
    .mixed()
    .required("File is Required")
    .test(
      "fileSize",
      "File more than 0.5 MB not Allowed",
      (value) => value && value.size <= 524288
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )

  // website: yup.string().url().required("Website is Required"),

  // select: yup.string().required("Select a Option"),
});
