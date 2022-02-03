import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MembersRepository {

  async findOne(id: string) {
    const contents = await readFile('members.json', 'utf8');
    const members = JSON.parse(contents);

    return members[id];
  }

  async findAll() {
    const contents = await readFile('members.json', 'utf8');
    const members = JSON.parse(contents);
  
    return members;

  }

  async create(name: string) {
    const contents = await readFile('members.json', 'utf8');
    const members = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);

    //{
    //  1: { id: 1, name: "Wayne"}
    //}
   
    members[id] = {id, name};

    await writeFile('members.json', JSON.stringify(members)) 
  }
  

}