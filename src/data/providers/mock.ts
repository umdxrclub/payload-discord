import { DiscordDataAPI, DiscordGuild, DiscordUser } from "../discord";

/**
 * A mock Discord API which lets you substitute your own API responses.
 */
export class MockDiscordDataProvider implements DiscordDataAPI {
    public readonly users: Map<string, DiscordUser>;
    public readonly guilds: Map<string, DiscordGuild>;
    public delayMs: number = 3000;

    constructor() {
        this.users = new Map();
        this.guilds = new Map();
    }

    async fetchUser(id: string) {
        let user = this.users.get(id);
        await this.waitForArtificialDelay();
        return user ?? null;
    }

    async fetchGuild(id: string) {
        let guild = this.guilds.get(id);
        await this.waitForArtificialDelay();
        return guild ?? null;
    }

    async fetchChannel(id: string) {
        await this.waitForArtificialDelay();
        return null;
    }

    async fetchMessage(channelId: string, messageId: string) {
        await this.waitForArtificialDelay();
        return null;
    }

    async fetchGuildEmoji(guildId: string, emojiId: string) {
        await this.waitForArtificialDelay();
        return null;
    }

    async fetchGuildEvent(guildId: string, emojiId: string) {
        await this.waitForArtificialDelay();
        return null;
    }

    private async waitForArtificialDelay() {
        await new Promise(resolve => {
            setTimeout(resolve, 3000);
        })
    }
}