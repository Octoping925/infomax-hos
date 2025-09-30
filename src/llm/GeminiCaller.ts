import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { LlmCaller } from './LlmCaller';
import { ConfigService } from '@nestjs/config';
import { Question } from 'src/domain/hots/Question';

@Injectable()
export class GeminiCaller implements LlmCaller {
  private readonly MODEL = 'gemini-2.5-flash';

  constructor(private readonly configService: ConfigService) {}

  async askQuestion(question: Question): Promise<string> {
    const ai = this.createAi();
    const response = await ai.models.generateContent({
      model: this.MODEL,
      contents: question.getQuestion(),
      config: {
        systemInstruction: question.getInstruction(),
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
