import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup
    .string(),
    password: yup
    .string()
});