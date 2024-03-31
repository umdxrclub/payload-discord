import { Props } from "payload/components/fields/Text";
import React from "react";
import {
    useRoleOptions
} from "./DiscordContext";
import GuildAndStubField, { GuildAndStubProps } from "./GuildAndStubField";

let guildToOptions = (val: string | undefined) => useRoleOptions(val)

const GuildRoleField: React.FC<Props> = p => {
    let props: GuildAndStubProps = {
        ...p,
        stub: "role",
        guildToOptions
    }
  return (
    <GuildAndStubField {...props} />
  );
};

export default GuildRoleField;
