import { Config, Plugin } from "payload";
import { DiscordPluginConfig } from "./types";

var _config: DiscordPluginConfig;

export function payloadDiscord(config: DiscordPluginConfig): (incomingConfig: Config) => Config {
  _config = config;

  const plugin: (incomingConfig: Config) => Config = (incomingConfig: Config) => {
    const newConfig: Config = {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
        components: {
          ...incomingConfig.admin?.components,
          // providers: [
          //   ...(incomingConfig.admin?.components?.providers ?? []),
          //   DiscordContextProvider,
          // ],
        }
      },
    };

    return newConfig;
  };

  return plugin;
}

export function getPluginConfig(): DiscordPluginConfig {
  return _config;
}
