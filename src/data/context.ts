import { createContext, useContext } from "react";
import { DiscordDataAPI } from "./discord";
import { NullDiscordDataProvider } from "./providers/null";

export const DiscordDataContext = createContext<DiscordDataAPI>(NullDiscordDataProvider);

export function useDiscord(): DiscordDataAPI {
    return useContext(DiscordDataContext);
}