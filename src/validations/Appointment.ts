import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const appointmentInputSchema = yup.object().shape({
  gender: yup
    .string()
    .required('Gender is a required field'),
  firstName: yup.string().required('First Name is a required field'),
  address: yup.string().optional(),
  lastName: yup.string().required('Last Name is a required field'),
  mobile_no: yup.string().required('Mobile is a required field'),
  appointment_date_time: yup.string().required('Appointment date time is a required field'),
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
