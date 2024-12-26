import { Field, FieldBase } from "payload";

export type GuildFieldProps = FieldBase & {

};

export function DiscordGuildField(props: GuildFieldProps): Field {
    return {
        ...props,
        type: 'text'
    }
}