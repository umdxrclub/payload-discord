import { Field, FieldBase } from "payload";

export type DiscordGuildRoleProps = FieldBase & {

}

export function DiscordGuildRoleField(props: DiscordGuildRoleProps): Field {
    return {
        ...props,
        type: "group",
        admin: {
            ...props.admin,
            components: {
                // Field: "@xrclub/payload-discord/dist/fields/User/field.jsx",
            }
        },
        fields: [
            {
                name: "guildId",
                type: "text"
            },
            {
                name: "roleId",
                type: "text"
            }
        ]
    }
}