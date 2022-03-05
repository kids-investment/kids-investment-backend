import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { load } from 'cheerio';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class ApplePodcastService {
  constructor(private httpService: HttpService) {}

  
  async getLatestEmbededUrl(): Promise<string> {
    const url = encodeURI(`https://podcasts.apple.com/tw/podcast/小朋友學投資/id1544379769`);
    const observable = this.httpService.get(url).pipe(map((res) => res.data));
    const data = lastValueFrom(observable);
    const $ = load(await data);
    const latestEmbededUrl = $('a[data-episode-id]').attr('href').replace("https://podcasts", "https://embed.podcasts");
    return latestEmbededUrl;
  }
}
