import { DiscordConfig, getDiscordBotSlug } from "../globals/Discord";
import payload from "payload";

export async function getDiscordBotConfig(): Promise<DiscordConfig> {
  return await payload.findGlobal({
    slug: getDiscordBotSlug(),
  }) as unknown as DiscordConfig;
}
