import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Interface } from 'readline';
import { Observable, lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { FollowerCount } from './followers.entity';
import { IGResponse } from './interfaces/instagram.interface';

@Injectable()
export class InstagramService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(FollowerCount)
    private repo: Repository<FollowerCount>,
  ) {}

  async getSubscriberCount(): Promise<number> {
    // const observable = this.httpService
    //   .get('https://www.instagram.com/kids_investment_/channel/?__a=1')
    //   .pipe(map((res) => res.data));
    // const data: Promise<IGResponse> = lastValueFrom(observable);
    // return (await data).graphql.user.edge_followed_by.count;
    const record = await this.repo.findOne({order: {updated_at: "DESC"}})
    return record.count
  }
}
