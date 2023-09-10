import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";

const AllGuildsEndpoint: Endpoint = {
    path: "/guilds",
    method: "get",
    handler: handleWithDiscordClient(async (req, res, client) => {
        let guilds = Array.from((await client.guilds.fetch()).values());
        res.status(200).send(guilds.map(g => ({
            name: g.name,
            iconUrl: g.iconURL(),
            id: g.id
        })))
    })
}

export default AllGuildsEndpoint;