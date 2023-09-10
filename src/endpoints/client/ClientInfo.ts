import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";
import { getClientOverview, getUserSummary } from "../../discord/data";

const ClientInfoEndpoint: Endpoint = {
  path: "/client",
  method: "get",
  handler: handleWithDiscordClient(async (req, res, client) => {
    let overview = await getClientOverview(client);
    res.status(200).send(overview)
  }),
};

export default ClientInfoEndpoint;
