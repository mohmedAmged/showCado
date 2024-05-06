import * as yup from "yup";

export const RecommendUsSchema = yup.object().shape({
    "name": yup
    .string(),
    "description": yup
    .string(),
});