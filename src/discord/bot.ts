import { Client } from "discord.js";
import { getDiscordBotConfig } from "../server/DiscordUtility";

type DiscordClientInitializer = () => Promise<Client>
var _client: Client | undefined = undefined;
var _initializer: DiscordClientInitializer | undefined = undefined

export function getDiscordClient(): Client | undefined {
  return _client;
}

export async function setBotEnabled(enabled: boolean) {
  let botConfig = await getDiscordBotConfig();
  if (enabled && !_client && _initializer && botConfig.auth.token) {
    // Start the bot using the provided initializer.
    _client = await _initializer()

    try {
        await _client.login(botConfig.auth.token)
    } catch (error) {
        console.error("Failed to initialize client: " + error)
    }
  } else if (!enabled && _client) {
    // Stop the bot.
    _client.destroy();
    _client = undefined;
  }
}

export async function initializeDiscordClient(
  initializer: DiscordClientInitializer
) {
  let botConfig = await getDiscordBotConfig();
  _initializer = initializer
  setBotEnabled(botConfig.enabled)
}
