import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

// import { render } from "react-dom";
// import Button from "@material-ui/core/Button";
// import { Formik, Field, Form } from "formik";
// import {
//   LinearProgress,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   FormHelperText,
//   Input
// } from "@material-ui/core";
// import MuiTextField from "@material-ui/core/TextField";
// import {
//   fieldToTextField,
//   TextField,
//   TextFieldProps,
//   SimpleFileUpload,
//   SimpleFileUploadProps,
//   Select,
//   Switch
// } from "formik-material-ui";
// import * as Yup from "yup";

// const CustomFileUpload = (props: SimpleFileUploadProps) => (
//   <FormControl>
//     {props.label && (
//       <InputLabel shrink error={!!props.form.error}>
//         {props.label}
//       </InputLabel>
//     )}
//     <Input
//       error={!!props.form.error}
//       inputProps={{
//         type: "file",
//         disabled: props.disabled || props.form.isSubmitting,
//         name: props.field.name,
//         onChange: (event: any) => {
//           const file = event.currentTarget.files[0];
//           props.form.setFieldValue(props.field.name, file);
//         }
//       }}
//     />
//     {props.form.error && (
//       <FormHelperText error>{props.form.error}</FormHelperText>
//     )}
//   </FormControl>
// );
// const MAX_FILE_SIZE = 2097152;
// const schema = Yup.object({
//   inputFile: Yup.mixed()
//     .required("Required")
//     .test(
//       "fileFormat",
//       "Unsupported Format",
//       (value) => value && ["image/jpg", "image/jpeg"].includes(value.type)
//     )
// });

// const App = () => (
//   <Formik
//     initialValues={{
//       inputFile: ""
//     }}
//     validationSchema={schema}
//     onSubmit={(values, { setSubmitting }) => {
//       console.log(values);
//       setTimeout(() => {
//         setSubmitting(false);
//         alert(JSON.stringify(values, null, 2));
//       }, 500);
//     }}
//     render={({ errors, submitForm, isSubmitting, values, setFieldValue }) => (
//       <Form>
//         <Field name="inputFile" label="File" component={CustomFileUpload} />
//         {isSubmitting && <LinearProgress />}
//         {console.log(errors)}
//         <br />
//         <Button
//           variant="raised"
//           color="primary"
//           disabled={isSubmitting}
//           onClick={submitForm}
//         >
//           Submit
//         </Button>
//       </Form>
//     )}
//   />
// );
// render(<App />, document.getElementById("root"));
