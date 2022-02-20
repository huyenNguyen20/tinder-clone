import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Location } from '../user.interface';
import { Like } from './like.entity';
import { Pass } from './pass.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  registerDate: string;

  @Column()
  phone: string;

  @Column()
  picture: string;

  @Column('simple-json')
  location: Location;

  @OneToOne(() => Like, )
  @JoinColumn()
  likeList: Like;

  @OneToOne(() => Pass)
  @JoinColumn()
  passList: Pass;
}
