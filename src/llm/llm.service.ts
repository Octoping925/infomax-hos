import { Inject, Injectable } from '@nestjs/common';
import { LlmCaller } from './LlmCaller';
import { HotsMap } from '../domain/hots/map';
import { HeroTipQuestion } from '../domain/hots/HeroTipQuestion';
import { MapStrategyQuestion } from '../domain/hots/MapStrategyQuestion';

@Injectable()
export class LlmService {
  constructor(@Inject('LlmCaller') private readonly llmCaller: LlmCaller) {}

  async getHeroTips(hero: string) {
    const question = new HeroTipQuestion(hero);
    const response = await this.llmCaller.askQuestion(question);
    return response;
  }

  async getMapStrategy(mapTitle: string) {
    const map = HotsMap.fromValue(mapTitle);
    const question = new MapStrategyQuestion(map);

    const response = await this.llmCaller.askQuestion(question);
    return response;
  }
}
