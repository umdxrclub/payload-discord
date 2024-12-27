import { Field, FieldBase } from "payload";

export type ChannelFieldProps = FieldBase & {

};

export function DiscordChannelField(props: ChannelFieldProps): Field {
    return {
        ...props,
        type: "text",
        admin: {
          ...props.admin,
        //   placeholder: UserInputPlaceholderText,
          components: {
            Field: "@xrclub/payload-discord/dist/fields/Channel/field.jsx",
            // Cell: "@xrclub/payload-discord/dist/fields/User/cell.jsx",
          },
        },
        // validate: validateDiscordUserId,
      };
}