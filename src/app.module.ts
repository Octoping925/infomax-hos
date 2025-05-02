import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { MessengerModule } from './messenger/messenger.module';

@Module({
  imports: [LlmModule, MessengerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
