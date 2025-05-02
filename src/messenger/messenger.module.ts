import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { LlmModule } from 'src/llm/llm.module';

@Module({
  controllers: [MessengerController],
  providers: [MessengerService],
  imports: [LlmModule],
})
export class MessengerModule {}
