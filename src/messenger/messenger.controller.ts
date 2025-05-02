import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post('test')
  async test(@Body() body: DooraySlashCommand) {
    console.log(body);

    try {
      const response = await fetch(body.responseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: body.cmdToken,
        },
        body: JSON.stringify({
          channelId: body.channelId,
          text: 'Please Wait...',
        }),
      });

      await response.text();
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const response = await fetch(body.responseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: body.cmdToken,
        },
        body: JSON.stringify({
          channelId: body.channelId,
          text: 'Hello',
          deleteOriginal: 'true',
        }),
      });

      await response.text();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('hero/tips')
  async getHeroTipsByPost(@Body() body: DooraySlashCommand) {
    console.log(JSON.stringify(body));

    if (!body.responseUrl.includes('dooray.com')) {
      return {
        message: 'Invalid response URL',
      };
    }

    const tips = await this.messengerService.getHeroTips(body.text);

    try {
      const response = await fetch(body.responseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: body.cmdToken,
        },
        body: JSON.stringify({
          text: tips,
          channelId: body.channelId,
        }),
      });

      await response.text();
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    console.log(tips);

    return {
      text: tips,
      channelId: body.channelId,
    };
  }
}

type DooraySlashCommand = {
  tenantId: string;
  tenantDomain: string;
  channelId: string;
  channelName: string;
  userId: string;
  command: string;
  text: string;
  responseUrl: string;
  appToken: string;
  cmdToken: string;
  triggerId: string;
};
