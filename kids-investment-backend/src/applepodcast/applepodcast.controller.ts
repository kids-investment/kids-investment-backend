import { Controller, Get, CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { ApplePodcastService } from './applepodcast.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('socials')
@Controller('applepodcast')
@UseInterceptors(CacheInterceptor)
export class ApplepodcastController {
  constructor(private applePodcastService: ApplePodcastService) {}

  @Get('/embededurl/latest')
  getLatestEmbededUrl() {
    return this.applePodcastService.getLatestEmbededUrl();
  }
}
