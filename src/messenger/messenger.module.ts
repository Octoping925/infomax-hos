import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { LlmModule } from 'src/llm/llm.module';
import { GeminiCaller } from 'src/llm/GeminiCaller';

@Module({
  controllers: [MessengerController],
  providers: [MessengerService, GeminiCaller],
  imports: [LlmModule],
})
export class MessengerModule {}
