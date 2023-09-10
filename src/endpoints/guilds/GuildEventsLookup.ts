import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";
import { getEventSummary } from "../../discord/data";

const GuildEventsLookup: Endpoint = {
  path: "/guilds/:id/events",
  method: "get",
  handler: handleWithDiscordClient(async (req, res, client) => {
    let guild = await client.guilds.fetch(req.params.id);

    if (!guild) {
      res.status(404).send({ err: "Guild not found." });
      return;
    }

    let events = Array.from((await guild.scheduledEvents.fetch()).values())
    res.status(200).send(events.map(getEventSummary))
  }),
};

export default GuildEventsLookup;
