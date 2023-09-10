import {
  Channel,
  ChannelType,
  Client,
  Emoji,
  Guild,
  GuildEmoji,
  GuildScheduledEvent,
  GuildScheduledEventStatus,
  NonThreadGuildBasedChannel,
  OAuth2Guild,
  Role,
  User,
} from "discord.js";

type Identifiable = {
  id: string;
};

export type UserSummary = Identifiable & {
  displayName: string;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
};

export function getUserSummary(user: User): UserSummary {
  return {
    displayName: user.displayName,
    username: user.username,
    avatarUrl: user.avatarURL(),
    createdAt: user.createdAt.toISOString(),
    id: user.id,
  };
}

export type GuildOverview = Identifiable & {
  name: string;
  iconUrl: string | null;
  totalMembers: number;
  channels: GuildChannelSummary[];
  roles: RoleSummary[];
  emojis: EmojiSummary[];
  events: EventSummary[];
};

export async function getGuildOverview(guild: Guild): Promise<GuildOverview> {
  let channels = await guild.channels.fetch();
  let roles = Array.from((await guild.roles.fetch()).values());
  let emojis = Array.from((await guild.emojis.fetch()).values());
  let events = Array.from((await guild.scheduledEvents.fetch()).values());

  return {
    name: guild.name,
    iconUrl: guild.iconURL(),
    totalMembers: guild.memberCount,
    channels: channels
      .filter((c): c is NonThreadGuildBasedChannel => c != null)
      .map(getGuildChannelSummary),
    roles: roles.map(getRoleSummary).sort((a, b) => a.position - b.position),
    emojis: emojis.map(getEmojiSummary),
    events: events.map(getEventSummary),
    id: guild.id
  };
}

export type GuildChannelSummary = Identifiable & {
  name: string;
  type: ChannelType;
};

export function getGuildChannelSummary(
  channel: NonThreadGuildBasedChannel
): GuildChannelSummary {
  return {
    name: channel.name,
    type: channel.type,
    id: channel.id,
  };
}

export type RoleSummary = Identifiable & {
  name: string;
  color: string;
  position: number;
};

export function getRoleSummary(role: Role): RoleSummary {
  return {
    name: role.name,
    color: role.hexColor,
    position: role.position,
    id: role.id,
  };
}

export type EmojiSummary = Identifiable & {
  name: string | null;
  animated: boolean | null;
  url: string;
};

export function getEmojiSummary(emoji: GuildEmoji): EmojiSummary {
  return {
    name: emoji.name,
    animated: emoji.animated,
    url: emoji.url,
    id: emoji.id,
  };
}

export type EventSummary = Identifiable & {
  name: string,
  coverImageUrl: string | null,
  description: string | null,
  userCount: number | null,
  creatorId: string | null,
  creatorDisplayName: string | null,
  status: GuildScheduledEventStatus
}

export function getEventSummary(
  event: GuildScheduledEvent<GuildScheduledEventStatus>
): EventSummary {
  return {
    name: event.name,
    coverImageUrl: event.coverImageURL(),
    description: event.description,
    userCount: event.userCount,
    creatorId: event.creatorId,
    creatorDisplayName: event.creator?.displayName ?? null,
    status: event.status,
    id: event.id,
  };
}

type OAuth2GuildSummary = Identifiable & {
  name: string;
  iconUrl: string | null;
};

export function getOAuth2GuildSummary(guild: OAuth2Guild): OAuth2GuildSummary {
  return {
    name: guild.name,
    id: guild.id,
    iconUrl: guild.iconURL(),
  };
}

export type ClientOverview = {
  user: UserSummary | null;
  guilds: OAuth2GuildSummary[];
};

export async function getClientOverview(
  client: Client
): Promise<ClientOverview> {
  let guilds = Array.from((await client.guilds.fetch()).values()).map(
    getOAuth2GuildSummary
  );

  return {
    user: client.user ? getUserSummary(client.user) : null,
    guilds: guilds,
  };
}
