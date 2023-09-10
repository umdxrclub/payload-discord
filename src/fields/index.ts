import { FieldBase } from "payload/dist/fields/config/types";
import { guildChannelField, guildField } from "./guilds";

export type FieldBaseNoType = Omit<FieldBase, "type">
export { guildField, guildChannelField };