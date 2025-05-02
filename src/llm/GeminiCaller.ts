import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { HeroTipQuestion } from 'src/domain/hots/HeroTipQuestion';
import { LlmCaller } from './LlmCaller';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class GeminiCaller implements LlmCaller {
  private readonly MODEL = 'gemini-2.0-flash';

  async askQuestion(instruction: string, message: string): Promise<string> {
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
}
