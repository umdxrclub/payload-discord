"use client";

import { FieldDescription, FieldLabel } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";
import React from "react";
import BaseDiscordComponent from "../../components/BaseDiscordComponent";

import "./field.scss";

const DiscordUserField: TextFieldClientComponent = (args) => {
  const {
    path,
    field: { label, localized, required, admin },
  } = args;

  return (
    <div>
      <FieldLabel
        path={path}
        label={label}
        localized={localized}
        required={required}
      />
      <BaseDiscordComponent>
        <div className="discord-user-row">
          <div className="discord-user-pfp">
            
          </div>
          <input />
        </div>
      </BaseDiscordComponent>
      <FieldDescription description={admin?.description} path={path} />
    </div>
  );
};

export default DiscordUserField;
