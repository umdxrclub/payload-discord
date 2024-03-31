import { Field } from "payload/dist/fields/config/types";
import { FieldBaseNoType } from ".";
import GuildEventField from "../components/GuildEventField";
import GuildField from "../components/GuildField";
import GuildRoleField from "../components/GuildRoleField";

type GuildFieldParameters = FieldBaseNoType;
export function guildField(field: FieldBaseNoType): Field {
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
export function guildChannelField(field: FieldBaseNoType): Field {
    return {
        ...field,
        type: "text"
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

type GuildRoleFieldParameters = FieldBaseNoType;
export function guildRoleField(field: GuildRoleFieldParameters): Field {
    return {
        ...field,
        type: "group",
        fields: [
            guildField({
                name: "guild"
            }),
            {
                name: "role",
                type: "text"
            }
        ],
        admin: {
            components: {
                Field: GuildRoleField
            }
        }
    }
}