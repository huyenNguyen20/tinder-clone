import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Pass extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @Column('simple-array')
  passedUserId: string[];

  @OneToOne(() => User, (user) => user.passList) // specify inverse side as a second parameter
  user: User;
}
