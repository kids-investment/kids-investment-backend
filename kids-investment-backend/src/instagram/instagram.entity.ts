import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IGFollowerCount {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  count: number;

  @Index()
  @Column()
  updated_at: Date;
}

@Entity()
export class IGPost {
  @PrimaryColumn()
  id: string;
  
  @Column()
  shortcode: string;

  @Column()
  thumbnail_src: string;

  @Index()
  @Column()
  taken_at_timestamp: Date;
}