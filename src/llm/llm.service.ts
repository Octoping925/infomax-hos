import { Inject, Injectable } from '@nestjs/common';
import { LlmCaller } from './LlmCaller';

@Injectable()
export class LlmService {
  constructor(@Inject('LlmCaller') private readonly llmCaller: LlmCaller) {}

  async askQuestion(message: string) {
    const response = await this.llmCaller.askQuestion(
      'You are a helpful assistant',
      message,
    );

    return response;
  }

  async getHeroTips(hero: string) {
    const response = await this.llmCaller.getHeroTips(hero);

    return response;
  }
}
