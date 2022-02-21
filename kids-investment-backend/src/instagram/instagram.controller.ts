import { Controller, Get } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('socials')
@Controller('instagram')
export class InstagramController {
  constructor(private instagramService: InstagramService) {}

  @Get('/subscriber/count')
  getSubscriberCount() {
    return this.instagramService.getSubscriberCount();
  }

  @Get('/fetch')
  fetchData() {
    return this.instagramService.fetchLatestInfo();
  }
}
