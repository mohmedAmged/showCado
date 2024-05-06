import { object, string } from 'yup';

export const countrySchema = object().shape({
    country: string()
    .required("Please choose a country"),
});