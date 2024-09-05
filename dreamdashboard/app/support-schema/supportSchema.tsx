import * as yup from 'yup';

export const supportSchema = yup
	.object()
	.shape({
		name: yup.string().trim().min(3, 'Full Name must be at least 3 characters.').required('This field is required.'),
		email: yup
        .string()
        .required('This field is required.')
        .test("is-valid-email", "Invalid email", function (value) {
          if (!value) {
            return true; // Allow empty value
          }
      
          // Your custom email format validation logic
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return emailRegex.test(value)
        }),
		subject: yup.string().trim().min(3, 'Subject must be at least 3 characters.').required('This field is required.'),
		description:yup.string().trim().min(3, 'Description must be at least 3 characters.').required('This field is required.'),	
	})
	.required();
