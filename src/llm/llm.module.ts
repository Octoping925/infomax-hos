import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { GeminiCaller } from './GeminiCaller';

@Module({
  providers: [LlmService, { provide: 'LlmCaller', useClass: GeminiCaller }],
  exports: [LlmService],
})
export class LlmModule {}
