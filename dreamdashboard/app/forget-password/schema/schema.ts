import * as yup from 'yup';

export const forgetSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("This field is required.")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email address'
      )
      .test('no-blank-spaces', 'Email cannot contain spaces', (value) => {
        return value === undefined || value === null || !/\s/.test(value);
      }),
  })
  .required();
