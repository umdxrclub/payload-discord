import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";
import { getUserSummary } from "../../discord/data";

const UserLookupEndpoint: Endpoint = {
  path: "/users/:id",
  method: "get",
  handler: [
    handleWithDiscordClient(async (req, res, client) => {
      let user = await client.users.fetch(req.params.id);
      if (user) {
        res.status(200).send(getUserSummary(user));
      } else {
        res.status(404).send({ err: "User not found." });
      }
    }),
  ],
};

export default UserLookupEndpoint;
