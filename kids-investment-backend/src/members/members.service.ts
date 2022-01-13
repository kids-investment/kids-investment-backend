import { Injectable } from "@nestjs/common";
import { MembersRepository } from "./members.repository";

@Injectable()
export class MembersService {
  constructor(public membersRepo: MembersRepository) { 
    //public means that it is a property of the class
  }

  findOne(id: string) {
    return this.membersRepo.findOne(id);
  }

  findAll() {
    return this.membersRepo.findAll();
  }
  
  create(name: string) {
    return this.membersRepo.create(name);
  }

}