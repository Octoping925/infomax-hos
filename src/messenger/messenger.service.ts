import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';

@Injectable()
export class MessengerService {
  constructor(private readonly llmService: LlmService) {}

  async askQuestion(message: string) {
    const response = await this.llmService.askQuestion(message);
    return response;
  }

  async getHeroTips(hero: string) {
    const response = await this.llmService.getHeroTips(hero);
    return response;
  }
}
