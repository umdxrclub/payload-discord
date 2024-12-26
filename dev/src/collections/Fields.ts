import { CollectionConfig } from "payload";
import { DiscordUserField, DiscordMessageField } from "@xrclub/payload-discord";

export const Fields: CollectionConfig = {
    slug: "fields",
    fields: [
        DiscordUserField({
            name: "user",
            admin: {
                description: "yuhhh"
            }
        }),
        DiscordMessageField({
            name: "message",
            admin: {
                description: "yuhh"
            },
        }),
        {
            type: "text",
            admin: {
                description: "label"
            },
            name: "test"
        }
    ]
}