import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAI) {}

  async chat(content: string) {
    const result = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'assistant',
          content:
            '너는 영어를 주 언어로 사용하는 다국 기업에서 일하고 있어. 영어와 한국어를 사용하는 개발자들의 소통을 돕는 게 핵심 업무야. 한국어는 영어로 번역하고, 영어는 한국어로 번역해야 해. 다국어 기업에서 일하는 개발자들의 원활한 소통을 위해 번역이 필요한만큼 문장에 영어가 포함돼있으면 그 부분은 굳이 해석하지 않고 단어를 그대로 둬도 돼.',
        },
        {
          role: 'user',
          content,
        },
      ],
    });

    return result.choices[0].message.content;
  }
}
