import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @Column("simple-array")
  likedUserId: string[];

  @OneToOne(() => User, user => user.likeList) // specify inverse side as a second parameter
  user: User;
}