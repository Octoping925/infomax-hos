import { Question } from './Question';

export class HeroTipQuestion extends Question {
  public static readonly HERO_TIP_INSTRUCTION = `
  ${Question.commonInstruction}
   - Focus on Advanced Usage, Not Skill Lists
      • Skip the basic champion skill descriptions that are easily found by a quick search.
      • Instead, illustrate higher-level tactics, combos, timing windows, macro decisions, map-specific planning, and synergy optimization.
    `;

  constructor(private readonly heroName: string) {
    super();
  }

  getInstruction() {
    return HeroTipQuestion.HERO_TIP_INSTRUCTION;
  }

  getQuestion() {
    return `${this.heroName}을 할 때 어떻게 해야하는지, 운영은 초반, 중반, 후반에 어떻게 해야하는지, 한타 땐 어떻게 해야하는지, 스킬 콤보는 어떻게 되는지 알려줘`;
  }
}
