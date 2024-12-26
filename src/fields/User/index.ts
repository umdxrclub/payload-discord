import { Field, FieldBase } from "payload";

export type DiscordUserFieldProps = FieldBase & {

}

export function DiscordUserField(props: DiscordUserFieldProps): Field {
    return {
        ...props,
        type: "text",
        admin: {
            ...props.admin,
            components: {
                Field: "@xrclub/payload-discord/dist/fields/User/field.jsx",
            }
        }
    }
}