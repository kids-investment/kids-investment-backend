import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('[INSERTED] Member with ID: ', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('[UPDATED] Member with ID: ', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('[REMOVED] Member with ID: ', this.id)
  }

}