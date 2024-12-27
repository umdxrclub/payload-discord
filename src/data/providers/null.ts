import { DiscordDataAPI, DiscordUser } from "../discord";

const NullHandler = async () => null;

export const NullDiscordDataProvider: DiscordDataAPI = {
    fetchUser: NullHandler,
    fetchChannel: NullHandler,
    fetchGuild: NullHandler,
    fetchMessage: NullHandler,
    fetchGuildEmoji: NullHandler,
    fetchGuildEvent: NullHandler
}