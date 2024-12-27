
export type DiscordUser = {
    id: string,
    name: string,
    profilePictureUrl?: string;
}

export type DiscordGuild = {
    id: string;
    name: string;
    iconUrl?: string;
}

export type DiscordChannel = {
    id: string;
    name: string;
}

export interface DiscordDataAPI {
    fetchUser: (userId: string) => Promise<DiscordUser | null>
    fetchGuild: (guildId: string) => Promise<DiscordGuild | null>
    fetchChannel: (channelId: string) => Promise<DiscordChannel | null>,
    fetchMessage: (channelId: string, messageId: string) => Promise<null>,
    fetchGuildEmoji: (guildId: string, emojiId: string) => Promise<null>,
    fetchGuildEvent: (guildId: string, emojiId: string) => Promise<null>,
}
