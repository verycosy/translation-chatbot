import { Inject, Injectable } from '@nestjs/common';
import { Client, Events } from 'discord.js';
import { OpenAIService } from '../open-ai/open-ai.service';
import { DISCORD } from './discord.token';

@Injectable()
export class DiscordService {
  constructor(
    @Inject(DISCORD) private readonly client: Client,
    private readonly openaiService: OpenAIService,
  ) {
    const command = '!translate';

    this.client.on(Events.MessageCreate, async (message) => {
      const { author, content } = message;

      if (author.bot || !content.startsWith(command)) {
        return;
      }

      const translation = await this.openaiService.chat(
        content.replace(command, ''),
      );
      await message.reply(translation);
    });
  }
}
