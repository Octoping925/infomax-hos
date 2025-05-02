import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { HotsMap } from 'src/domain/hots/map';

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
          responseType: 'inChannel',
          deleteOriginal: 'true',
        }),
      });

      await response.text();
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    console.log(tips);
  }

  @Post('map/strategy/choice')
  async getMapStrategyChoice(@Body() body: DooraySlashCommand) {
    const maps = HotsMap.values<HotsMap>();

    const response = await fetch(body.responseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: body.cmdToken,
      },
      body: JSON.stringify({
        channelId: body.channelId,
        attachments: [
          {
            callbackId: 'send-map-strategy', // 사용자 상호 작용 시 함께 전송됩니다. 상호 작용이 일어난 attachment를 식별할 때 쓸 수 있습니다.
            actions: maps.map((map) => ({
              name: 'send',
              type: 'button',
              text: map.getTitle(), // 사용자에게 출력되는 버튼 텍스트
              value: map.value, // Action 동작에 사용하는 (사용자에게 보이지 않는) 값
              style: 'primary',
            })),
          },
        ],
        responseType: 'inChannel',
        deleteOriginal: 'true',
      }),
    });

    await response.text();
    console.log(response);
  }

  @Post('map/strategy/tips')
  async getMapStrategy(@Body() body: DooraySlashInteraction) {
    const strategy = await this.messengerService.getMapStrategy(body.text);

    const response = await fetch(body.originalMessage.responseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: body.cmdToken,
      },
      body: JSON.stringify({
        text: strategy,
        channelId: body.originalMessage.channelId,
        responseType: 'inChannel',
        deleteOriginal: 'true',
      }),
    });

    await response.text();
    console.log(response);
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

type DooraySlashInteraction = {
  // 테넌트, 채널, 멤버 정보가 제공됩니다.
  tenant: {
    id: string;
    domain: string;
  };
  channel: {
    id: string;
    name: string;
  };
  user: {
    id: string;
  };
  commandName: string;
  command: string;
  text: string;
  callbackId: string;
  actionName: string;
  actionValue: string;
  appToken: string;
  cmdToken: string;
  triggerId: string;
  commandRequestUrl: string;
  channelLogId: string;
  originalMessage: DooraySlashCommand;
};
