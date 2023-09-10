import { Field } from "payload/dist/fields/config/types";
import { FieldBaseNoType } from ".";
import GuildField from "../components/GuildField";
import GuildChannelField from "../components/GuildChannelField";
import GuildEventField from "../components/GuildEventField";

type GuildFieldParameters = FieldBaseNoType;
export function guildField(field: GuildFieldParameters): Field {
  return {
    ...field,
    type: "text",
    admin: {
      components: {
        Field: GuildField,
      },
    },
  };
}

type GuildChannelFieldParameters = FieldBaseNoType;
export function guildChannelField(field: GuildChannelFieldParameters): Field {
    return {
        ...field,
        type: "group",
        fields: [
            guildField({
                name: "guild"
            }),
            {
                type: "text",
                name: "channel"
            }
        ],
        admin: {
            components: {
                Field: GuildChannelField
            }
        }
    }
}

type GuildEventFieldParameters = FieldBaseNoType;
export function guildEventField(field: GuildEventFieldParameters): Field {
    return {
        ...field,
        type: "group",
        fields: [
            guildField({
                name: "guild",
            }),
            {
                name: "event",
                type: "text"
            }
        ],
        admin: {
            components: {
                Field: GuildEventField
            }
        },
        validate: (value) => {
            // We can allow undefined as value.
            if (!value) return true;

            let hasGuild = !!value.guild;
            let hasEvent = !!value.event;
            let valid = (hasGuild && hasEvent) || (!hasGuild && !hasEvent);

            return valid ? true : "Cannot partially fill in an event field!";
        }
    }
}