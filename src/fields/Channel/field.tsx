"use client";

import { FieldDescription, FieldLabel, useField } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";
import { useCallback } from "react";
import DiscordAPIInputField, {
  APIDataFetcher,
} from "../../components/DiscordAPIInputField";
import { useDiscord } from "../../data/context";

const DiscordChannelField: TextFieldClientComponent = (args) => {
  const {
    path,
    readOnly,
    field: { label, localized, required, admin },
  } = args;
  const { value: fieldValue, setValue: setFieldValue } = useField<string>({
    path,
  });
  const api = useDiscord();
  const payloadPlaceholder = admin?.placeholder as string | undefined;

  const fetchData = useCallback<APIDataFetcher>(async (id) => {
    let channel = await api.fetchChannel(id);

    return {
      displayName: channel?.name,
    };
  }, []);

  return (
    <div>
      <FieldLabel
        path={path}
        label={label}
        localized={localized}
        required={required}
      />
      <DiscordAPIInputField
        value={fieldValue}
        onValueChange={setFieldValue}
        required={required}
        readOnly={readOnly}
        placeholder={payloadPlaceholder}
        fetchData={fetchData}
      />
      <FieldDescription description={admin?.description} path={path} />
    </div>
  );
};

export default DiscordChannelField;
