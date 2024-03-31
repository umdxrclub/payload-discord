import React, { useContext, useEffect, useState } from "react";
import { ClientOverview, GuildOverview } from "../discord/data";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { OptionObject } from "payload/dist/fields/config/types";

type DiscordData = {
  client: ClientOverview | null;
};
type DiscordContextData = DiscordData | null;

const DiscordQueryClient = new QueryClient();

export function useDiscordClient() {
  return useQuery({
    queryKey: ["client"],
    queryFn: () =>
      fetch("/api/globals/discord/client").then(
        (res) => res.json() as Promise<ClientOverview>
      ),
  });
}

function useOptions<T>(data: T | undefined, map: (data: T) => OptionObject[]) {
  const [options, setOptions] = useState<OptionObject[]>([]);

  useEffect(() => {
    setOptions(data ? map(data) : [])
  }, [data])

  return options;
}

export function useGuildOptions() {
  let client = useDiscordClient().data;

  return useOptions(client?.guilds, guilds => guilds.map(g => ({
    label: g.name,
    value: g.id
  })))
}

export function useChannelOptions(guildId: string | undefined) {
  let guild = useDiscordGuild(guildId).data;

  return useOptions(guild, guild => guild?.channels.map(c => ({
    label: c.name,
    value: c.id
  })) ?? []);
}

export function useEventOptions(guildId: string | undefined) {
  let guild = useDiscordGuild(guildId).data;

  return useOptions(guild, guild => guild?.events.map(e => ({
    label: e.name,
    value: e.id
  })) ?? []);
}

export function useRoleOptions(guildId: string | undefined) {
  let guild = useDiscordGuild(guildId).data;

  return useOptions(guild, guild => guild?.roles.map(r => ({
    label: r.name,
    value: r.id
  })) ?? []);
}

export function useDiscordGuild(guildId: string | undefined) {
  return useQuery({
    queryKey: [`guild-${guildId ?? "null"}`],
    queryFn: () => guildId ?
      fetch(`/api/globals/discord/guilds/${guildId}`).then(
        (res) => res.json() as Promise<GuildOverview | null>
      ) : Promise.resolve(null)
  });
}

type DiscordContextProviderProps = {
  children: React.ReactNode;
};

export const DiscordContextProvider: React.FC<DiscordContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<DiscordContextData>(null);

  useEffect(() => {
    fetch("/api/globals/discord/client")
      .then((res) => res.json())
      .then((j) => setData({ client: j }));
  }, []);

  return (
    <QueryClientProvider client={DiscordQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
