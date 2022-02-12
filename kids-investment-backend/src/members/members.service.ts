import { Injectable } from '@nestjs/common';
//import { MembersRepository } from './members.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}


  findOne(id: number) {
    return this.repo.findOne(id);
  }

  // findAll() {
  //   return this.repo.findAll();
  // }

  create(email: string, password: string) {
    const member = this.repo.create({ email, password });
    return this.repo.save(member);
  }
}
