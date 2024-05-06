import * as yup from "yup";

export const UpdateProfileSchema = yup.object().shape({
    "first_name": yup
    .string(),
    "last_name": yup
    .string(),
    "phone": yup
    .number(),
    "zip_code": yup 
    .string(),
    "email": yup
    .string(),
    "country_id": yup
    .string(),
    "city_id": yup
    .string(),
    "state": yup
    .string(),
});