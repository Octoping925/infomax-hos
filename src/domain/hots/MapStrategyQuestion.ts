import { HotsMap } from './map';
import { Question } from './Question';

export class MapStrategyQuestion extends Question {
  public static readonly MAP_STRATEGY_INSTRUCTION = `
  ${Question.commonInstruction}

  - Focus on Advanced Strategy about Map, Not just explain the map
   • Skip the basic map information that are easily found by a quick search.
   • Instead, illustrate higher-level tactics, combos, timing windows, macro decisions, map-specific planning, and synergy optimization.

  - Tell me what position to play for each tank, dealer, and healer
  `;

  constructor(private readonly map: HotsMap) {
    super();
  }

  createQuestion() {
    return `${this.map.value} 맵의 특징, 유리한 영웅, 불리한 영웅, 중요한 전략적 위치 등을 알려줘`;
  }
}
