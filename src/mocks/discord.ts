import { DiscordDataAPI } from "../data/discord";
import { MockDiscordDataProvider } from "../data/providers/mock";

let MockData: MockDiscordDataProvider | undefined = undefined;

export function getDiscordMockData(): DiscordDataAPI {
  if (!MockData) {
    MockData = new MockDiscordDataProvider();
    MockData.users.set("201812291228925952", {
      id: "201812291228925952",
      name: "djfigs1",
      profilePictureUrl:
        "https://cdn.discordapp.com/avatars/201812291228925952/691b605aafbdd15e8f741200157255bb?size=1024",
    });
    MockData.guilds.set("1087528191809298546", {
      id: "1087528191809298546",
      name: "ICXR",
    });
  }

  return MockData;
}
