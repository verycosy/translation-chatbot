import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { OpenAIModule } from '../open-ai/open-ai.module';
import { DiscordService } from './discord.service';
import { DISCORD } from './discord.token';

@Module({
  imports: [OpenAIModule],
  providers: [
    {
      provide: DISCORD,
      useFactory: () =>
        new Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
        }),
    },
    DiscordService,
  ],
})
export class DiscordModule implements OnModuleInit {
  constructor(
    @Inject(DISCORD) readonly client: Client,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.client.login(this.configService.getOrThrow('DISCORD_KEY'));
  }
}
