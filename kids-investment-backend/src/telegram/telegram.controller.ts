import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('socials')
@Controller('telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Get('/subscriber/count')
  getSubscriberCount() {
    return this.telegramService.listSubscriberCount();
  }
}
