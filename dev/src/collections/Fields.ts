import { CollectionConfig } from 'payload'
import {
  DiscordUserField,
  DiscordMessageField,
  DiscordGuildField,
  DiscordChannelField,
  DiscordGuildEmojiField,
  DiscordGuildEventField,
} from '@xrclub/payload-discord'

export const Fields: CollectionConfig = {
  slug: 'fields',
  fields: [
    DiscordUserField({
      name: 'user',
      admin: {
        description: 'yuhhh',
      },
    }),
    DiscordChannelField({
      name: 'channel',
    }),
    DiscordMessageField({
      name: 'message',
      admin: {
        description: 'yuhh',
      },
    }),
    DiscordGuildField({
      name: 'guild',
    }),
    DiscordGuildEmojiField({
      name: 'guildEmoji',
    }),
    DiscordGuildEventField({
      name: 'guildEvent',
    }),
    {
      type: 'text',
      required: true,
      admin: {
        description: 'label',
      },
      name: 'test',
    },
  ],
}
