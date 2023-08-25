import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const signUpScreenInputSchema = yup.object().shape({
  firstName: yup.string().required('First name is a required field'),
  lastName: yup.string().optional(),
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email address is required'),
  phone: yup.string().min(11).required('Phone number is a required field'),
  cnic: yup.string().min(13).required('CNIC number is a required field'),
  password: yup.string().min(8).required('Password is a required field'),
  gender: yup.string().required('Gender is a required field'),
  Confirm_Password: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is a required field'),
});
