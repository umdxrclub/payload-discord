import { Stack } from "@mui/material";
import { Props } from "payload/components/fields/Text";
import { Label, useFormFields } from "payload/components/forms";
import ReactSelect from "payload/dist/admin/components/elements/ReactSelect";
import { OptionObject } from "payload/types";
import React from "react";
import {
    useGuildOptions
} from "./DiscordContext";

const GuildStub = ".guild";

export type GuildAndStubProps = Props & {
    stub: string,
    guildToOptions: (guild: string | undefined) => OptionObject[]
}
const GuildAndStubField: React.FC<GuildAndStubProps> = ({ path, label, required, name, stub, guildToOptions }) => {
  if (!path) return null;

  let guildPath = path + GuildStub;
  let stubPath = path + "." + stub;

  const guildField = useFormFields(([fields]) => fields[guildPath]);
  const stubField = useFormFields(([fields]) => fields[stubPath]);
  const dispatch = useFormFields((reducer) => reducer[1]);

  function setStubValue(newStubValue: string | null) {
    // Also clear out the field.
    setStub(null);

    dispatch({
      type: "UPDATE",
      path: guildPath,
      value: newStubValue,
    });
  }

  function setStub(newStub: string | null) {
    dispatch({
      type: "UPDATE",
      path: stubPath,
      value: newStub,
    });
  }

  const guildOptions = useGuildOptions();
  const options = guildToOptions(guildField.value as string | undefined);

  let currentGuild = guildOptions.find((o) => o.value == guildField.value) ?? [];
  let currentStubValue = options.find((o) => o.value == stubField.value) ?? [];

  return (
    <div>
      <Label label={label} />
      <Stack direction={"row"} spacing={2}>
        <div style={{flex: 1}}>
          <ReactSelect
            value={currentGuild}
            onChange={(o) => setStubValue(o ? (o.value as string) : null)}
            options={guildOptions}
            isClearable={true}
          />
        </div>
        <div style={{flex: 1}}>
          <ReactSelect
            value={currentStubValue}
            onChange={(o) => setStub(o ? (o.value as string) : null)}
            options={options}
            disabled={!guildField.value}
            isClearable={true}
          />
        </div>
      </Stack>
    </div>
  );
};

export default GuildAndStubField;
