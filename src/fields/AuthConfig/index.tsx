import { Field, FieldBase } from "payload";

export type Config = FieldBase & {
    name: string;
}

export function DiscordAuthConfig(config: Config): Field {
    return {
        ...config,
        type: "group",
        fields: [

        ]
    }
}