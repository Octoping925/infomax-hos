import { Controller, Get, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @Get('chat')
  async askQuestion(@Query('message') message: string) {
    console.log(message);
    const response = await this.messengerService.askQuestion(message);

    return {
      message: response,
    };
  }

  @Get('hero/tips')
  async getHeroTips(@Query('hero') hero: string) {
    return this.messengerService.getHeroTips(hero);
  }
}
