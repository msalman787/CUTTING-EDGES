import * as yup from 'yup';

export const VerifyProductScreenInputSchema = yup.object().shape({
    VerifyCode: yup.string().required("Verify Code is a required field"),
});
