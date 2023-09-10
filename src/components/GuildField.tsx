import { Props } from "payload/components/fields/Text";
import SelectInput from "payload/dist/admin/components/forms/field-types/Select/Input";
import useField from "payload/dist/admin/components/forms/useField";
import { OptionObject } from "payload/dist/fields/config/types";
import React, { useEffect, useState } from "react";
import { useDiscordClient } from "./DiscordContext";

const GuildField: React.FC<Props> = ({ path, label, required, name }) => {
  if (!path) return null;

  const client = useDiscordClient().data;
  const { value, setValue } = useField<string | undefined>({ path: path });
  const [channelOptions, setGuildOptions] = useState<OptionObject[]>([]);

  useEffect(() => {
    setGuildOptions(
      (client?.guilds ?? []).map((g) => ({
        label: `${g.name}`,
        value: g.id,
      }))
    );
  }, [client?.guilds]);

  return (
    <SelectInput
      name={name}
      path={path}
      label={label}
      required={required}
      value={value}
      onChange={(o) => setValue(o.value)}
      options={channelOptions}
    />
  );
};

export default GuildField;