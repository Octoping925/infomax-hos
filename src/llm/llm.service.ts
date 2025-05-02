import { Inject, Injectable } from '@nestjs/common';
import { LlmCaller } from './LlmCaller';
import { HotsMap } from 'src/domain/hots/map';

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

  async getMapStrategy(mapTitle: string) {
    const map = HotsMap.fromValue(mapTitle);
    const response = await this.llmCaller.getMapStrategy(map);

    return response;
  }
}
