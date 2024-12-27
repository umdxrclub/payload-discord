import { Field, FieldBase } from "payload";

export type DiscordGuildEventProps = FieldBase & {

}

export function DiscordGuildEventField(props: DiscordGuildEventProps): Field {
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
                name: "eventId",
                type: "text"
            }
        ]
    }
}