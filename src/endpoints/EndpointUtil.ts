import { PayloadHandler } from "payload/config";
import { getDiscordClient } from "../discord/bot";
import { Client } from "discord.js";
import { PayloadRequest } from "payload/types";
import { Response } from "express";

export type DiscordClientHandler = (
  req: PayloadRequest,
  res: Response,
  client: Client
) => void;

export function handleWithDiscordClient(
  handler: DiscordClientHandler
): PayloadHandler {
  return async (req, res) => {
    let client = await getDiscordClient();

    if (!client) {
      res.status(500).send({ err: "No Discord client active" });
      return;
    }

    if (!req.user) {
      res.status(401).send({ err: "You must be signed in."})
      return;
    }

    handler(req, res, client);
  };
}