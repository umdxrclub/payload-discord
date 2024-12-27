import { Field, FieldBase } from "payload";

export type GuildFieldProps = FieldBase & {

};

export function DiscordGuildField(props: GuildFieldProps): Field {
  return {
    ...props,
    type: "text",
    admin: {
      ...props.admin,
    //   placeholder: UserInputPlaceholderText,
      components: {
        Field: "@xrclub/payload-discord/dist/fields/Guild/field.jsx",
        // Cell: "@xrclub/payload-discord/dist/fields/User/cell.jsx",
      },
    },
    // validate: validateDiscordUserId,
  };
}