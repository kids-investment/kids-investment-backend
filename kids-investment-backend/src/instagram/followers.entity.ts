import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class FollowerCount {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  count: number;

  @Index()
  @Column()
  updated_at: Date;
}