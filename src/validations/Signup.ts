import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const signUpScreenInputSchema = yup.object().shape({
  registrationNumber: yup
    .string()
    .required('Registration No is a required field'),
  firstName: yup.string().required('First Name is a required field'),
  lastName: yup.string().required('Last Name is a required field'),
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  password: yup.string().min(8).required('Password is a required field'),
  Confirm_Password: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is a required field'),
});
