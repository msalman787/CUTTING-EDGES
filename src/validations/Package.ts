import * as yup from 'yup';

export const packageInputSchema = yup.object().shape({
    Plan_title: yup.string().required('Title is a required field'),
    location: yup.string().required('Location is a required field'),
    type: yup.string().required('Package type is a required field'),
    google_map_link: yup.string().required('Map location is a required field'),
    Plan_tag_line: yup.string().required('Tagline Tag is a required field'),
    Plan_price: yup.string().required('Price is a required field'),
    Plan_description: yup.string().required('Description is a required field'),
});
