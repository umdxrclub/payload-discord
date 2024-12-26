import { Field, FieldBase } from "payload";

export type DiscordGuildEmojiProps = FieldBase & {

}

export function DiscordMessageField(props: DiscordGuildEmojiProps): Field {
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
                name: "channelId",
                type: "text"
            },
            {
                name: "messageId",
                type: "text"
            }
        ]
    }
}