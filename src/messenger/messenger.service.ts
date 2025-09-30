import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class MessengerService {
  constructor(private readonly llmService: LlmService) {}

  async getHeroTips(hero: string) {
    const response = await this.llmService.getHeroTips(hero);
    return response;
  }

  async getMapStrategy(mapTitle: string) {
    const response = await this.llmService.getMapStrategy(mapTitle);
    return response;
  }

  async getRotations() {
    type ApiResponse = {
      RotationHero: { Heroes: { Name: string; ImageURL: string }[] };
    };

    const data = (await fetch(`https://nexuscompendium.com/api/currently`).then(
      (res) => res.json(),
    )) as ApiResponse;

    return data.RotationHero.Heroes.map((it) => ({
      name: it.Name,
      imageURL: it.ImageURL,
    }));
  }
}
