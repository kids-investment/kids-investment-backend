import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { IGFollowerCount, IGPost } from './instagram.entity';
import { IGResponse } from './interfaces/instagram.interface';

@Injectable()
export class InstagramService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(IGFollowerCount)
    private igFlowerCountrepo: Repository<IGFollowerCount>,
    @InjectRepository(IGPost)
    private igPost: Repository<IGPost>,
  ) {}

  async getSubscriberCount(): Promise<number> {
    const record = await this.igFlowerCountrepo.findOne({
      order: { updated_at: 'DESC' },
    });
    return record.count;
  }

  async fetchLatestInfo(): Promise<void> {
    const observable = this.httpService
      .get('https://www.instagram.com/kids_investment_/channel/?__a=1')
      .pipe(map((res) => res.data));
    const data: Promise<IGResponse> = lastValueFrom(observable);
    const graphqlData = (await data).graphql;
    const subscriberCount = graphqlData.user.edge_followed_by.count;
    this.igFlowerCountrepo.save({
      count: subscriberCount,
      updated_at: new Date(),
    });
    const posts = graphqlData.user.edge_owner_to_timeline_media.edges.map(
      (node) => ({
        ...node.node,
        taken_at_timestamp: new Date(node.node.taken_at_timestamp * 1000),
        page_count: node.node.edge_sidecar_to_children.edges.length,
      }),
    );
    this.igPost.save(posts);
  }
}
