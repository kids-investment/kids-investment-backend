import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InstagramService } from 'src/instagram/instagram.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { YoutubeService } from 'src/youtube/youtube.service';

@ApiTags('socials')
@Controller('socials')
@UseInterceptors(CacheInterceptor)
export class SocialsController {
  constructor(
    private instagramService: InstagramService,
    private youtubeService: YoutubeService,
    private telegramService: TelegramService,
  ) {}

  @Get('/subscribers')
  async listAll() {
    return {
      instagram: this.instagramService.getSubscriberCount(),
      youtube: await this.youtubeService.getSubscriberCount(),
      telegram: (await this.telegramService.listSubscriberCount()).map(
        (channel) => ({
          titel: channel.title,
          subscribers: channel.subscribers,
        }),
      ),
    };
  }
}
