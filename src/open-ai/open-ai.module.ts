import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OpenAIService } from './open-ai.service';

@Module({
  providers: [
    {
      provide: OpenAI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new OpenAI({
          apiKey: configService.getOrThrow('OPENAI_KEY'),
        }),
    },
    OpenAIService,
  ],
  exports: [OpenAIService],
})
export class OpenAIModule {}
