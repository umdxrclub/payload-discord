import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";

const GuildIconLookupEndpoint: Endpoint = {
  path: "/guilds/:id/icon",
  method: "get",
  handler: handleWithDiscordClient(async (req, res, client) => {
    let guild = await client.guilds.fetch(req.params.id);

    if (!guild) {
      res.status(404).send({ err: "Guild not found." });
      return;
    }

    let guildIcon = guild.iconURL();
    if (guildIcon) {
      res.redirect(guildIcon);
    } else {
      res.status(404).send({ err: "Guild does not have an icon." });
    }
  }),
};

export default GuildIconLookupEndpoint;