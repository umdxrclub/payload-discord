export interface DiscordDataProvider {
    fetchUser: (id: string) => Promise<void>
}

