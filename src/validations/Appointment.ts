import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const appointmentInputSchema = yup.object().shape({
  first_name: yup.string().required('First Name is a required field'),
  last_name: yup.string().required('Last Name is a required field'),
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
  mobile_number: yup.string().required('Mobile is a required field'),
  address: yup.string().required('Address is a required field'),
  gender: yup.string().required('Gender is a required field'),
  appointment_date_time: yup
    .string()
    .required('Appointment date time is a required field'),
});
