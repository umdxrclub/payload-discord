import { Field, FieldBase } from "payload";

export type DiscordGuildEmojiProps = FieldBase & {

}

export function DiscordGuildEmojiField(props: DiscordGuildEmojiProps): Field {
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
                name: "emojiId",
                type: "text"
            }
        ]
    }
}