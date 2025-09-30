import { Question } from 'src/domain/hots/Question';

export interface LlmCaller {
  askQuestion(question: Question): Promise<string>;
}
