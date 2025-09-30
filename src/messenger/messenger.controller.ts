import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { HotsMap } from '../domain/hots/map';
import type {
  DoorayButtonInteraction,
  DooraySlashCommand,
} from './dooray/command';
import { GeminiCaller } from 'src/llm/GeminiCaller';

@Controller('messenger')
export class MessengerController {
  constructor(
    private readonly messengerService: MessengerService,
    private readonly geminiCaller: GeminiCaller,
  ) {}

  @Get('hero/tips')
  async getHeroTips(@Query('hero') hero: string) {
    return this.messengerService.getHeroTips(hero);
  }

  @Post('rotations')
  async getRotations(@Body() body: DooraySlashCommand) {
    const rotations = await this.messengerService.getRotations();

    try {
      const response = await fetch(body.responseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: body.cmdToken,
        },
        body: JSON.stringify({
          text: rotations.map((it) => `- ${it.name}`).join('\n'),
          attachments: rotations.map((it) => ({
            image_url: it.imageURL,
            title: it.name,
            text: it.name,
          })),
          // channelId: body.channelId,
          responseType: 'inChannel',
          deleteOriginal: 'true',
        }),
      });

      await response.text();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
        text: '맵을 선택해주세요',
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
  async getMapStrategy(@Body() body: DoorayButtonInteraction) {
    console.log(body);
    const strategy = await this.messengerService.getMapStrategy(
      body.actionValue,
    );
    console.log(strategy);

    const response = await fetch(body.responseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: body.cmdToken,
      },
      body: JSON.stringify({
        text: strategy,
        channelId: body.channel.id,
        responseType: 'inChannel',
        deleteOriginal: 'true',
      }),
    });

    await response.text();
    console.log(response);
  }
}
