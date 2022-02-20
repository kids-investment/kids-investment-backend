import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}

  create(email: string, password: string) {
    const member = this.repo.create({ email, password });
    return this.repo.save(member);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async updateById(id: number, attrs: Partial<Member> ) {
    const user = await this.findOne(id);
    Object.assign(user, attrs); //Copying the updates that are provided
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
  
}
