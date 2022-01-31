import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { YoutubeService } from './youtube.service';

@ApiTags('socials')
@Controller('youtube')
export class YoutubeController {
constructor(private youtubeService: YoutubeService) {}

  @Get('/latest')
  getLatestVideo() {
    return this.youtubeService.getLatestVideo();
  }
}
