import * as yup from 'yup';

export const newComplainScreenInputSchema = yup.object().shape({
  Title: yup.string().required(),
  Description: yup.string().required(),
});
