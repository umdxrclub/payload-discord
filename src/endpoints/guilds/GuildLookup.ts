import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";
import { NonThreadGuildBasedChannel } from "discord.js";
import {
  getEmojiSummary,
  getEventSummary,
  getGuildChannelSummary,
  getGuildOverview,
  getRoleSummary,
} from "../../discord/data";

const GuildLookupEndpoint: Endpoint = {
  path: "/guilds/:id",
  method: "get",
  handler: handleWithDiscordClient(async (req, res, client) => {
    let guild = await client.guilds.fetch(req.params.id);
    if (!guild) {
      res
        .status(404)
        .send({ err: "Guild not found or is unaccessible by this bot." });
      return;
    }

    let overview = await getGuildOverview(guild);
    res.status(200).send(overview);
  }),
};

export default GuildLookupEndpoint;
