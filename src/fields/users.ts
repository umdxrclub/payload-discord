import { Field } from "payload/types";
import { FieldBaseNoType } from ".";

type UserFieldParameters = FieldBaseNoType
export function userField(parameters: UserFieldParameters): Field {
    return {
        ...parameters,
        type: "text"
    }
}