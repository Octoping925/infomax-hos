import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { HeroTipQuestion } from 'src/domain/hots/HeroTipQuestion';
import { LlmCaller } from './LlmCaller';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiCaller implements LlmCaller {
  private readonly MODEL = 'gemini-2.5-flash-preview-04-17';

  constructor(private readonly configService: ConfigService) {}

  async askQuestion(instruction: string, message: string): Promise<string> {
    const ai = this.createAi();
    const response = await ai.models.generateContent({
      model: this.MODEL,
      contents: message,
      config: {
        systemInstruction: instruction,
      },
    });

    if (!response.text) {
      throw new Error('No response from Gemini');
    }

    return response.text;
  }

  async getHeroTips(heroName: string): Promise<string> {
    const question = new HeroTipQuestion(heroName);
    const questionText = question.createQuestion();

    const ai = this.createAi();

    const response = await ai.models.generateContent({
      model: this.MODEL,
      contents: questionText,
      config: {
        systemInstruction: HeroTipQuestion.HERO_TIP_INSTRUCTION,
      },
    });

    if (!response.text) {
      throw new Error('No response from Gemini');
    }

    return response.text;
  }

  private createAi() {
    return new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });
  }
}
