import { Stack } from "@mui/material";
import { Props } from "payload/components/fields/Text";
import { Label, useFormFields } from "payload/components/forms";
import ReactSelect from "payload/dist/admin/components/elements/ReactSelect";
import React from "react";
import {
  useEventOptions,
  useGuildOptions
} from "./DiscordContext";

const GuildStub = ".guild";
const EventStub = ".event";

const GuildEventField: React.FC<Props> = ({ path, label, required, name }) => {
  if (!path) return null;

  let guildPath = path + GuildStub;
  let eventPath = path + EventStub;

  const guild = useFormFields(([fields]) => fields[guildPath]);
  const event = useFormFields(([fields]) => fields[eventPath]);
  const dispatch = useFormFields((reducer) => reducer[1]);

  function setGuild(newGuild: string | null) {
    // Also clear out the event field.
    setEvent(null);

    dispatch({
      type: "UPDATE",
      path: guildPath,
      value: newGuild,
    });
  }

  function setEvent(newEvent: string | null) {
    dispatch({
      type: "UPDATE",
      path: eventPath,
      value: newEvent,
    });
  }

  const guildOptions = useGuildOptions();
  const eventOptions = useEventOptions(guild.value as string | undefined);

  let currentGuild = guildOptions.find((o) => o.value == guild.value) ?? [];
  let currentEvent = eventOptions.find((o) => o.value == event.value) ?? [];

  return (
    <div>
      <Label label={label} />
      <Stack direction={"row"} spacing={2}>
        <div style={{flex: 1}}>
          <ReactSelect
            value={currentGuild}
            onChange={(o) => setGuild(o ? (o.value as string) : null)}
            options={guildOptions}
            isClearable={true}
          />
        </div>
        <div style={{flex: 1}}>
          <ReactSelect
            value={currentEvent}
            onChange={(o) => setEvent(o ? (o.value as string) : null)}
            options={eventOptions}
            disabled={!guild.value}
            isClearable={true}
          />
        </div>
      </Stack>
    </div>
  );
};

export default GuildEventField;
