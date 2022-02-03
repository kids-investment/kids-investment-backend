import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import { last } from 'cheerio/lib/api/traversing';
import { lastValueFrom, map } from 'rxjs';
import { Channel } from './interfaces/telegram.interface';

@Injectable()
export class TelegramService {
  constructor(private httpService: HttpService) {}

  listSubscriberCount() {
    const ids: { [key: string]: string } = {
      '小朋友學投資-愛德恩速覽': 'printmoneey',
      '小朋友學投資/不魯玩股邏輯': 'blueplaystock',
      '小朋友學投資/凱瑞解惑區': 'joinchat/AAAAAEThnYbQh3SzKMUX1g',
      '小朋友盤中閒聊區 不準亂聽亂買!': 'kids_intraday',
      小朋友歡樂聊天室: 'carryuuuu',
    };
    const promise = Object.values(ids).map(
      async (id) => await this.getChannelInfo(id),
    );
    return Promise.all(promise);
  }

  async getChannelInfo(id: string): Promise<Channel> {
    const url = `https://t.me/${id}`;
    const observable = this.httpService.get(url).pipe(map((res) => res.data));
    const data = lastValueFrom(observable);
    const $ = cheerio.load(await data);
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const extra = $('div[class=tgme_page_extra]').text();
    const subscriberCountRaw =
      /(\d+ ){1,2}(?=members|subscribers)/.exec(extra)[0] || '';
    const subscribers = parseInt(subscriberCountRaw.replace(' ', ''));
    return await {
      title,
      description,
      subscribers,
    };
  }
}
