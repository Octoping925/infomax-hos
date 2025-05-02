import { HotsMap } from 'src/domain/hots/map';

export interface LlmCaller {
  askQuestion(instruction: string, message: string): Promise<string>;
  getHeroTips(hero: string): Promise<string>;
  getMapStrategy(map: HotsMap): Promise<string>;
}
