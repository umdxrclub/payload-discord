import { GlobalConfig } from "payload/dist/globals/config/types";
import { getPluginConfig } from "../plugin";
import ToggleBotEnabled from "../hooks/StartBot";
import GuildLookupEndpoint from "../endpoints/guilds/GuildLookup";
import UserLookupEndpoint from "../endpoints/users/UserLookup";
import UserAvatarLookupEndpoint from "../endpoints/users/UserAvatarLookup";
import GuildIconLookupEndpoint from "../endpoints/guilds/GuildIconLookup";
import AllGuildsEndpoint from "../endpoints/guilds/AllGuilds";
import ClientInfoEndpoint from "../endpoints/client/ClientInfo";
import GuildEventsLookup from "../endpoints/guilds/GuildEventsLookup";
import DiscordClient from "../components/DiscordClient";

export type DiscordConfig = {
  enabled: boolean;
  auth: {
    clientId?: string;
    clientSecret?: string;
    token?: string;
  };
};

export function getDiscordBotSlug() {
  let config = getPluginConfig();
  return config.botSlug ?? "discord";
}

export function createDiscordGlobalConfig(
  slug: string | undefined
): GlobalConfig {
  return {
    slug: getDiscordBotSlug(),
    endpoints: [
      AllGuildsEndpoint,
      GuildLookupEndpoint,
      UserLookupEndpoint,
      UserAvatarLookupEndpoint,
      GuildIconLookupEndpoint,
      ClientInfoEndpoint,
      GuildEventsLookup
    ],
    fields: [
      {
        name: "discordClientOverview",
        type: "ui",
        admin: {
          components: {
            Field: DiscordClient
          }
        }
      },
      {
        name: "enabled",
        type: "checkbox",
        required: true,
        defaultValue: true,
        hooks: {
          afterChange: [ToggleBotEnabled],
        },
      },
      {
        name: "auth",
        type: "group",
        label: "Authentication",
        fields: [
          {
            name: "clientId",
            type: "text",
          },
          {
            name: "clientSecret",
            type: "text",
          },
          {
            name: "token",
            type: "text",
          },
        ],
      },
    ],
  };
}
