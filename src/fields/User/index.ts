import { Field, FieldBase, TextField } from "payload";

export type DiscordUserFieldProps = FieldBase & {};

function validateDiscordUserId(
  value: string | null | undefined
): true | string {
  if (!value) {
    return true;
  }

  if (value.length == 0 || value.length == 18) {
    return true;
  }

  return "Discord user identifiers must be 18 characters in length.";
}

const UserInputPlaceholderText = "0".repeat(18);

export function DiscordUserField(props: DiscordUserFieldProps): TextField {
  return {
    ...props,
    type: "text",
    admin: {
      ...props.admin,
      placeholder: UserInputPlaceholderText,
      components: {
        Field: "@xrclub/payload-discord/dist/fields/User/field.jsx",
        Cell: "@xrclub/payload-discord/dist/fields/User/cell.jsx",
      },
    },
    validate: validateDiscordUserId,
  };
}
