import { Endpoint } from "payload/config";
import { handleWithDiscordClient } from "../EndpointUtil";

const UserAvatarLookupEndpoint: Endpoint = {
  path: "/users/:id/avatar",
  method: "get",
  handler: [
    handleWithDiscordClient(async (req, res, client) => {
      let user = await client.users.fetch(req.params.id);
      if (!user) {
        res.status(404).send({ err: "User not found." });
        return;
      }

      let avatarUrl = user.avatarURL();
      if (avatarUrl) {
        res.redirect(avatarUrl);
      } else {
        res.status(404).send({ err: "User does not have an avatar." });
      }
    }),
  ],
};

export default UserAvatarLookupEndpoint;
