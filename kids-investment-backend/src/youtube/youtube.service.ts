import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
var { google } = require('googleapis');

@Injectable()
export class YoutubeService {
  constructor(private configService: ConfigService) {}

  async getSubscriberCount() {
    const response = google
      .youtube({
        version: 'v3',
        auth: this.configService.get('YOUTUBE_AUTH_KEY'),
      })
      .channels.list({ part: 'statistics', id: 'UCp2CPYdnlEHvcJpLGjB7qgw' });
    const count = await response.then(
      (r) => r.data.items[0].statistics.subscriberCount,
    );
    return parseInt(count);
  }
  getLatestVideo() {
    const response = google
      .youtube({
        version: 'v3',
        auth: this.configService.get('YOUTUBE_AUTH_KEY'),
      })
      .playlistItems.list({
        part: 'snippet',
        playlistId: 'UUp2CPYdnlEHvcJpLGjB7qgw', // Upload Playlist
      });
    const snippet = response.then((r) => r.data.items[0].snippet);
    return snippet;
  }
}
