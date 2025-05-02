export interface LlmCaller {
  askQuestion(instruction: string, message: string): Promise<string>;
  getHeroTips(hero: string): Promise<string>;
}
