import { ClientOptions } from "discord.js";
import path from "path";
import { Config, Plugin } from "payload/config";
import { DiscordContextProvider } from "./components/DiscordContext";
import { createDiscordGlobalConfig } from "./globals/Discord";
import { webpackIgnore } from "./webpack-ignore";

export type DiscordPluginConfig = {
  botSlug?: string;
  options: ClientOptions;
};

var _config: DiscordPluginConfig;

export function createDiscordPlugin(config: DiscordPluginConfig): Plugin {
  _config = config;

  const plugin: Plugin = (incomingConfig: Config) => {
    const newConfig: Config = {
      ...incomingConfig,
      globals: [
        ...(incomingConfig.globals ?? []),
        createDiscordGlobalConfig(config.botSlug),
      ],
      admin: {
        ...incomingConfig.admin,
        components: {
          ...incomingConfig.admin?.components,
          providers: [
            ...(incomingConfig.admin?.components?.providers ?? []),
            DiscordContextProvider,
          ],
        },
        webpack: webpackIgnore(
          path.resolve(__dirname, "./mocks/EmptyObject.js"),
          ["./discord/", "./hooks/", "./server/", "./endpoints/"],
          ["util"],
          incomingConfig.admin?.webpack
        ),
      },
    };

    return newConfig;
  };

  return plugin;
}

export function getPluginConfig(): DiscordPluginConfig {
  return _config;
}
