import * as yup from "yup";

export const VoteDiscoverSchema = yup.object().shape({
    "discover_sub_category_id": yup
    .string(),
    "discover_id": yup
    .string(),
    "discover_ids": yup
    .array(),
});